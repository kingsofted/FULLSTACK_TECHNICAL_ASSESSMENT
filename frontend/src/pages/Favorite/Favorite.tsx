import React from "react";
import Header from "../../components/common/Header/Header";
import Parallax from "../../components/parallex/Parallax";
import Mansonry from "../../components/Masonry/Mansonry";
import LoadingScreen from "../../components/common/Loading/LoadingScreen";
import { useQuery, useMutation } from "@apollo/client";
import { GET_FAVORITES, REMOVE_FAVORITE } from "../../api/favorite.api";
import { Box, Typography, Snackbar, Alert } from "@mui/material";
import { SnackbarSeverity, useSnackbar } from "../../utils/Snackbar";

const Favorites: React.FC = () => {
  const { snackbarOpen, snackbarMessage, snackbarSeverity, showSnackbar, handleClose } =
    useSnackbar();

  const { data, loading, error, refetch } = useQuery(GET_FAVORITES, {
    fetchPolicy: "no-cache",
  });

  const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
    onCompleted: () => {
      showSnackbar("Removed from favorites!", SnackbarSeverity.SUCCESS);
      refetch();
    },
    onError: () => {
      showSnackbar("Failed to remove favorite", SnackbarSeverity.ERROR);
    },
  });

  if (loading) return <LoadingScreen loading={true} error={error?.message} />;

  const favoritesList =
    data?.favorites?.map((fav: any) => ({
      ...fav.job,
      favoriteId: fav.id, // keep track of the favorite id for deletion
    })) || [];

  const handleRemove = async (favoriteId: string) => {
    await removeFavorite({
       variables: { 
        input: {favoriteId: favoriteId} 
      }
    });
  };

  return (
    <section>
      <Header />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Box sx={{ textAlign: "center", mt: 4, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Your Favorite Jobs
        </Typography>
      </Box>

      {favoritesList.length > 0 ? (
        <Mansonry jobs={favoritesList} onRemoveFavorite={handleRemove} />
      ) : (
        <Typography align="center" color="text.secondary" sx={{ mt: 5 }}>
          No favorites yet. Go add some!
        </Typography>
      )}

      <Parallax />
    </section>
  );
};

export default Favorites;
