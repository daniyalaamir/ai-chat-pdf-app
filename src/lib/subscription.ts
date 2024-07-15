import { auth } from "@clerk/nextjs";
import prismadb from "./prisma";
import { stripe } from "./stripe";

export const isValidSubscription = async () => {
  const { userId } = auth()

  if (!userId) return false

  const subscription = await prismadb.subscription.findUnique({
    where: {
      userId
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripePriceId: true
    }
  })

  if (!subscription) return false

  const isValid = subscription.stripePriceId && 
                  subscription.stripeCurrentPeriodEnd?.getTime()! > Date.now()
  
  return !!isValid
}

export const generateBillingLink = async () => {
  const defaultUrl = process.env.BASE_URL + "/documents"

  const { userId } = auth()

  if (!userId) return false

  const subscription = await prismadb.subscription.findUnique({
    where: {
      userId
    }
  })

  if (subscription && subscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: defaultUrl
    })

    return stripeSession.url
  }
}