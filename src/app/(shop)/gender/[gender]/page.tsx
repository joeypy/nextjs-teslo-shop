export const revalidate = 60;

import { redirect } from "next/navigation";

import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import { Gender } from "@prisma/client";

type Props = {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
};

const labels: Record<string, string> = {
  kid: "para Niños",
  women: "para Mujeres",
  men: "para Hombres",
  unisex: "para todos",
};

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { gender } = params;

  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  return (
    <div>
      <Title
        title={`Artículos ${(labels as any)[gender]}`}
        subtitle="Todos los productos"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default CategoryPage;
