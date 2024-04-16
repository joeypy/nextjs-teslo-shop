import { getCategories, getProductBySLug } from "@/actions";
import { ProductForm, Title } from "@/components";
import { redirect } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ProductsPage({ params }: Props) {
  const { slug } = params;

  const [product, categories] = await Promise.all([
    getProductBySLug(slug),
    getCategories(),
  ]);

  if (!product && slug !== "new") {
    redirect("/admin/products");
  }

  const title = slug === "new" ? "Nuevo producto" : "Editar producto";

  return (
    <>
      <Title title={title} />
      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}
