import { Box, Typography } from "@mui/material";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { useCallback, useEffect, useRef } from "react";
import { useBookDetailsContext } from "~/context/BookDetailsContext";

type GalleryImageType = {
  href: string;
  src: string;
};

type BookGalleryProps = {
  gallery: GalleryImageType[];
};

export function BookGallery({ gallery }: BookGalleryProps) {
  const { bookDetails } = useBookDetailsContext();
  const renderGallery = useCallback(() => {
    return gallery.slice(1, gallery.length).map(({ href, src }, index) => (
      <a
        className="gallery"
        key={index}
        href={href}
        style={{ display: `${index <= 4 ? "inline-flex" : "none"}` }}
      >
        <Box
          display={"inline-flex"}
          sx={{
            width: 80,
            height: 80,
            borderRadius: 2,
            paddingX: 1,
            justifyItems: "center",
            border: "1px solid grey",
            overflow: "hidden",
            marginX: 0.5,
            position: "relative",
          }}
        >
          <img
            height={"100%"}
            width={"100%"}
            alt={`Ảnh ${index + 1}`}
            src={src}
            style={{ objectFit: "contain" }}
          />
          {index === 4 && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.8)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography fontWeight={"bold"}>
                + {gallery.length - 7}
              </Typography>
            </Box>
          )}
        </Box>
      </a>
    ));
  }, [gallery]);
  const renderImages = useCallback(() => {
    return bookDetails?.imageUrls.map((url, index) => (
      <a
        className="gallery"
        key={index}
        href={url}
        style={{ display: `${index <= 4 ? "inline-flex" : "none"}` }}
      >
        <Box
          display={"inline-flex"}
          sx={{
            width: 80,
            height: 80,
            borderRadius: 2,
            paddingX: 1,
            justifyItems: "center",
            border: "1px solid grey",
            overflow: "hidden",
            marginX: 0.5,
            position: "relative",
          }}
        >
          <img
            height={"100%"}
            width={"100%"}
            alt={`Ảnh ${index + 1}`}
            src={url}
            style={{ objectFit: "contain" }}
          />
          {index === 4 && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.8)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography fontWeight={"bold"}>
                + {gallery.length - 7}
              </Typography>
            </Box>
          )}
        </Box>
      </a>
    ));
  }, [bookDetails?.imageUrls, gallery.length]);
  useEffect(() => {
    lightGallery.current.refresh();
  }, [gallery]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lightGallery = useRef<any>(null);
  return (
    <LightGallery
      selector={".gallery"}
      onInit={(detai) => (lightGallery.current = detai.instance)}
      speed={500}
      plugins={[lgThumbnail, lgZoom]}
    >
      <Box sx={{ display: "inline-flex", gap: 1, flexDirection: "column" }}>
        <a
          className="gallery"
          href={
            bookDetails?.imageUrls ? bookDetails.imageUrls[0] : gallery[0].href
          }
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ height: 300, width: 450 }}>
            <img
              alt="Ảnh thumbnail"
              height={"100%"}
              width={"100%"}
              style={{ objectFit: "contain" }}
              src={
                bookDetails?.imageUrls
                  ? bookDetails.imageUrls[0]
                  : gallery[0].href
              }
            />
          </Box>
        </a>
        <Box sx={{ display: "inline-flex", justifyContent: "center" }}>
          {bookDetails ? renderImages() : renderGallery()}
        </Box>
      </Box>
    </LightGallery>
  );
}
