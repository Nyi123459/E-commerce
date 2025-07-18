'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/lib/formatters"
import { useActionState, useState } from "react"
import { addProduct, updateProduct } from "../../_actions/products"
import { useFormStatus } from "react-dom"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
    import { Product } from "../../../../../generated/prisma"

export function ProductForm({product}:{product?: Product | null }) {
    const [error, action] = useActionState(product == null ? addProduct : updateProduct.bind(null, product.id),
    {})
    const [priceInCents, setPriceInCents] = useState<number>(product?.priceInCents ?? 0)
    return <form action={action} className="space-y-8">
        <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" required defaultValue={product?.name || ""}/>
            {error.name && (
                <div className="test-destructive">{error.name}</div>
                )}
        </div>
        <div className="space-y-2">
            <Label htmlFor="priceInCents">Price In Cents</Label>
            <Input 
            type="number" 
            id="priceInCents" 
            name="priceInCents" 
            required 
            value={priceInCents} 
            onChange={e => setPriceInCents(Number(e.target.value) || 0)}
            />
            <div className="text-muted-foreground">
                {formatCurrency((priceInCents || 0) / 100)}
            </div>
            {error.priceInCents && (
                <div className="test-destructive">{error.priceInCents}</div>
                )}
        </div>
        <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required defaultValue={product?.description}/>
            {error.description && (
                <div className="test-destructive">{error.description}</div>
                )}
        </div>
        <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input type="file" id="file" name="file" required={product === null}/>
            {product != null && (
                <div className="text-muted-foreground">{product?.filePath}</div>
            )}
            {error.file && (
                <div className="test-destructive">{error.file}</div>
                )}
        </div>
        <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input type="file" id="image" name="image" required={product === null}/>
            {product != null && (
                <Image
                src={product.imagePath}
                height= "400"
                width= "400"
                alt= "Product Image"
                />
                )}
            {error.image && (
                <div className="test-destructive">{error.image}</div>
                )}
        </div>
        <SubmitButton/>
    </form>
}

function SubmitButton() {
    const {pending} = useFormStatus()
    return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}