export default function getFullImageUrl(imageUrl: string) {
    return `${import.meta.env.VITE_API_BASE_URL}/${imageUrl}`;
  };