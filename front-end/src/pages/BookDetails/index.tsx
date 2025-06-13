import { BookDetailsProvider } from "~/context/BookDetailsContext";
import { BookDetails } from "./BookDetail";

export default function BookDetailsPage() {
  return (
    <BookDetailsProvider>
      <BookDetails />
    </BookDetailsProvider>
  );
}