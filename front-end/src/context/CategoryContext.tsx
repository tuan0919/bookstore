// context/PromotionOverviewContext.tsx
import { createContext, useContext, ReactNode } from "react";
import { useCategory } from "~/hooks/use-category";

const CategoryContext = createContext<ReturnType<typeof useCategory>>(
  {} as ReturnType<typeof useCategory>
);

export const useCategoryContext = () => useContext(CategoryContext);

export const CategoryContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useCategory();
  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
