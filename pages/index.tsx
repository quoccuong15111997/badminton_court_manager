import React from "react"
import prisma from "../lib/prisma"
import { GetStaticProps } from "next/types"
import { InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany();
  console.log(users);
  const feed = [
    {
      id: "1",
      title: "Prisma is the perfect ORM for Next.js",
      content: "[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!",
      published: false,
      author: {
        name: "Nikolas Burk",
        email: "burk@prisma.io",
      },
    },
  ]
  return { 
    props: { feed }, 
    revalidate: 10 
  }
}

type Props = {
  
}

const Blog: React.FC<Props> = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <h1>Server is running</h1>
  )
}

export default Blog
