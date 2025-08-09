import { elasticClient } from "../../config/elasticSearch";
import { JOB_EVENTS, JobEventPayload, JOBTYPE } from "../../constant/constant";
import { Job } from "../../modal/favorite";
import { searchableFields } from "../searchableField";


export class JobElasticService {
  private index: string = process.env.ELASTICSEARCH_JOB_INDEX || "jobs";


  constructor() {
    this.createIndexIfNotExists().catch((error) => {
      console.error("Error creating index:", error);
    });
  }


  async handleEvent(payload: JobEventPayload): Promise<void> {
    switch (payload.event) {
      case JOB_EVENTS.JOB_CREATED:
        console.log(`Job created with ID: ${payload.data}`);
        this.createJob(payload.data as Job);

        break;
      case JOB_EVENTS.JOB_UPDATED:
        console.log(`Job updated with ID: ${payload.data}`);
        this.updateJob(payload.data as Job);

        break;
      case JOB_EVENTS.JOB_DELETED:
        console.log(`Job deleted with ID: ${payload.data}`);
        this.deleteJob(payload.data as Job);
        break;
      default:

        console.warn(`Unhandled event: ${payload.event}`);
    }
  }

  async createIndexIfNotExists() {
    const exists = await elasticClient.indices.exists({ index: this.index });

    if (!exists) {
      await elasticClient.indices.create({
        index: this.index,
        mappings: {
          properties: {
            id: { type: "keyword" },
            title: { type: "text" },
            company: { type: "text" },
            location: { type: "text" },
            experienceLevel: { type: "keyword" },
            salaryRange: { type: "float" },
            industry: { type: "text" },
            requiredSkills: { type: "text" },
          },
        },
      });
    }
  }

  async createJob(job: Job) {
    await elasticClient.index({
      index: this.index,
      id: job.id.toString(),
      document: job,
    });
  }

  async searchJobs(query: string) {
    const { hits } = await elasticClient.search({
      index: this.index,
      query: {
        multi_match: {
          query,
          fields: searchableFields,
          fuzziness: "AUTO",
        },
      },
    });

    // const { hits } = await elasticClient.search({
    //   index: this.index,
    //   query: {
    //     bool: {
    //       should: searchableFields.map((field) => ({
    //         wildcard: {
    //           [`${field}.keyword`]: `*${query}*`
    //         }
    //       }))
    //     }
    //   }
    // });


    return hits.hits.map((hit: any) => hit._source);
  }

  async deleteJob(job: Job) {
    await elasticClient.delete({
      index: this.index,
      id: job.id.toString(),
    });
  }

  async updateJob(job: Job) {
    await elasticClient.update({
      index: this.index,
      id: job.id.toString(),
      doc: job,
    });
  }

  async recommendJobs(job: Job) {
    // Fetch the current job document
    const jobFoundElastic = await elasticClient.get({
      index: this.index,
      id: job.id.toString(),
    });

    const jobElastic = jobFoundElastic._source as Job;

    if (!jobElastic) {
      throw new Error(`Job was not found`);
    }

    const { hits } = await elasticClient.search({
      index: this.index,
      query: {
        bool: {
          should: [
            {
              multi_match: {
                query: jobElastic.requiredSkills || "",
                fields: JOBTYPE.REQUIRED_SKILLS,
                boost: 3,
                fuzziness: "AUTO"
              }
            },
            {
              term: {
                industry: jobElastic.industry
              }
            },
            {
              match: {
                location: {
                  query: jobElastic.location,
                  fuzziness: "AUTO" 
                }
              }
            }
          ],
          must_not: {
            term: { _id: jobElastic.id }
          }
        }
      },
      size: 5
    });



    return hits.hits.map((hit: any) => hit._source);
  }

}

// Export a single instance for reuse
export const jobElasticService = new JobElasticService();


