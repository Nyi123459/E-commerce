import { Body, Container, Head, Heading, Html, Preview, Tailwind } from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";

type PurchaseReceiptEmailProps = {
    product: {
        name: string
        imagePath: string
        description: string
    }
    order: {
        id: string
        createdAt: Date
        pricePaidInCents: number
    }
    downloadVerificationId: string
}

PurchaseReceiptEmail.PreviewProps = {
    product: {
        name : "Product name", 
        description: "Some Description" ,
        imagePath: "\products\f18ba7d3-d22b-4707-adaa-4ea4446ac522-wp1820013-blade-runner-wallpapers.jpg"},
    order: {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        pricePaidInCents: 10000
    },
    downloadVerificationId: crypto.randomUUID()
} satisfies PurchaseReceiptEmailProps

export default function PurchaseReceiptEmail({
    product,
    order,
    downloadVerificationId
}: PurchaseReceiptEmailProps) {
    return (
        <Html>
            <Preview>Download{product.name} and view reciept</Preview>
            <Tailwind>
                <Head/>
                <Body className="font-sans bg-white">
                    <Container className="max-w-xl">
                        <Heading>Purchase Receipt</Heading>
                        <OrderInformation order={order} product={product} downloadVerificationId={downloadVerificationId}/>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}