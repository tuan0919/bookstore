import { Category } from "~/pages/Category/filter";
// const accessToken = "";
// try {
//  const response = await fetch("http://localhost:8181/api/book",{
//     method:"GET",
//     headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//  })
//  if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const dataCategories = await response.json();
// }catch(error){
//     console.log("Lỗi lấy data", error);
// }
const dataCategories = {
  code: 1000,
  result: {
    categoryResponseDTOs: {
      id: 1,
      name: "All category",
      children: [
        {
          id: 2,
          name: "Sách Tiếng Việt",
          children: [
            {
              id: 4,
              name: "Light Novel",
              children: [],
            },
            {
              id: 5,
              name: "Manga",
              children: [],
            },
          ],
        },
        {
          id: 3,
          name: "Sách ngoại văn",
          children: [
            {
              id: 6,
              name: "Light Novel",
              children: [],
            },
            {
              id: 7,
              name: "Manga",
              children: [],
            },
            {
              id: 8,
              name: "Art, Anime Character",
              children: [],
            },
          ],
        },
      ],
    },
    genreResponseDTOs: [
      {
        id: 1,
        name: "Comedy",
      },
      {
        id: 2,
        name: "Fantasy",
      },
      {
        id: 3,
        name: "Shounen",
      },
      {
        id: 4,
        name: "Action",
      },
      {
        id: 5,
        name: "Adventure",
      },
      {
        id: 6,
        name: "Drama",
      },
      {
        id: 7,
        name: "Sci Fi",
      },
      {
        id: 8,
        name: "Supernatural",
      },
    ],
  },
};
export function mapCategories(categories: any[]): Category[]{
  return categories.map((category)=>{
    let slug = "";
     switch (category.name) {
      case "Sách Tiếng Việt":
        slug = "sach-tieng-viet";
        break;
      case "Sách ngoại văn":
        slug = "sach-ngoai-van";
        break;
      case "Light Novel":
        slug = "light-novel";
        break;
      case "Manga":
        slug = "manga";
        break;
      case "Art, Anime Character":
        slug = "art-anime-character";
        break;
      
    }
    return {
      ... category,
      slug: slug,
      subCategories: category.children ? mapCategories(category.children) : [],
    }
  })
}
export function getCategories() {
  const categories = dataCategories.result.categoryResponseDTOs.children;
  const mappedCategories = mapCategories(categories);
  return mappedCategories;
}
