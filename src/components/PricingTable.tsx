import Script from "next/script"

interface Props {
  clientReferenceId: string,
  customerEmail: string
}

function PricingTable({ clientReferenceId, customerEmail }: Props) {
  return (
    <>
      <Script 
        async 
        strategy="lazyOnload" 
        src="https://js.stripe.com/v3/pricing-table.js"
      />
      <stripe-pricing-table 
        pricing-table-id="prctbl_1PcYMBIIjsdwn35GwBGLd1vu"
        publishable-key="pk_test_51PcY7ZIIjsdwn35GChhkt86DoDEVUz1kmTaFHEW2HDotVuOmcxJj5Rtk0dkooWO90CDdXHMdWGiBsMFFij50Ta1V00d5oiw1cC"
        client-reference-id={clientReferenceId}
        customer-email={customerEmail}
      />
    </>
  )
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export default PricingTable
