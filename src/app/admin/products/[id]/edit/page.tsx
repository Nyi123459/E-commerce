import { PageHeader } from "@/app/admin/_components/PageHeader"
import { ProductForm } from "../../_components/ProductForm"
import db from "@/db/db"


export default async function NewProductPage({params: {id}} : {params: {id: string}}) {
    const product = await db.product.findUnique({where: {id}})
    console.log("Product", product)
    return <>
        <PageHeader>Edit Product</PageHeader>
        <ProductForm product={product}/>
    </>
}