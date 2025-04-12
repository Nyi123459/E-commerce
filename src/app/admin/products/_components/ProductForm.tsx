'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/lib/formatters"
import { useActionState, useState } from "react"
import { addProduct } from "../../_action/products"
import { useFormStatus } from "react-dom"
import { Textarea } from "@/components/ui/textarea"

export function ProductForm() {
    const [error, action] = useActionState(addProduct,{})
    const [priceInCents, setPriceInCents] = useState<string>("")
    return <form action={action} className="space-y-8">
        <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" required/>
            {error.name && <div className="test-destructive">{error.name}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="priceInCents">Price In Cents</Label>
            <Input type="number" id="priceInCents" name="priceInCents" required value={priceInCents} onChange={e => setPriceInCents(e.target.value)}/>
            <div className="text-muted-foreground">{formatCurrency((Number(priceInCents) || 0)/100)}</div>
            {error.priceInCents && <div className="test-destructive">{error.priceInCents}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required/>
            {error.description && <div className="test-destructive">{error.description}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input type="file" id="file" name="file" required/>
            {error.file && <div className="test-destructive">{error.file}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input type="file" id="image" name="image" required/>
            {error.image && <div className="test-destructive">{error.image}</div>}
        </div>
        <SubmitButton/>
    </form>
}

function SubmitButton() {
    const {pending} = useFormStatus()
    return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}