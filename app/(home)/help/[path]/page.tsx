import { notFound } from 'next/navigation';
import React from 'react';
import { getArticleData } from '../lib/getArticleData';
import { getAllArticleData } from '../lib/getAllArticleData';
import { Article, WithContext } from 'schema-dts';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function PostPage(props: { params: { title: string } }) {
  const basePath = (publicRuntimeConfig && publicRuntimeConfig.basePath) || '';
  try {
    const data = await getArticleData(props.params.title);
    // mdのheader部分を除去したファイルを準備する
    const renderFile: string = data.file.replace(/^---[\s\S]*?---/, '');
    const jsonLd: WithContext<Article> = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      description: data.description,
      datePublished: data.date,
      image: data.image || basePath + '/img/no-image.webp',
      author: {
        '@type': 'Person',
        name: 'chakkun1121',
        url: 'https://chakkun1121.github.io/',
      },
    };
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <h1>{data.title}</h1>
        <MDXRemote
          source={renderFile}
          components={{
            a: (props) => <a target="_blank" {...props} />,
            img: (p) => {
              const { src, ...rest } = p;
              return (
                <img
                  src={
                    src.startsWith('http')
                      ? src
                      : './posts/' + props.params.title + src.replace(/^.\//g, '/')
                  }
                  {...rest}
                />
              );
            },
            h1: ({ children }) => <h1 className="pl-0">{children}</h1>,
            h2: ({ children }) => <h2 className="pl-1">{children}</h2>,
            h3: ({ children }) => <h3 className="pl-2">{children}</h3>,
            h4: ({ children }) => <h4 className="pl-3">{children}</h4>,
            h5: ({ children }) => <h5 className="pl-4">{children}</h5>,
            h6: ({ children }) => <h6 className="pl-5">{children}</h6>,
            p: ({ children }) => <p className="pl-6">{children}</p>,
            ul: ({ children }) => <ul className="ml-4">{children}</ul>,
            li: ({ children }) => <li className="list-inside list-disc">{children}</li>,
            table: ({ children }) => (
              <table className="block overflow-x-scroll whitespace-nowrap pl-4 ">{children}</table>
            ),
          }}
        />
      </>
    );
  } catch (e) {
    notFound();
  }
}
export async function generateStaticParams() {
  const recentArticles = await getAllArticleData();
  return recentArticles.map((article) => ({
    title: article.link.replace(/\//g, ''),
  }));
}
export async function generateMetadata({ params }) {
  try {
    const data = await getArticleData(params.title);
    const currentSiteUrl = `/${params.title}`;
    return {
      title: data.title,
      description: data.description,
      alternates: {
        canonical: currentSiteUrl,
      },
      openGraph: {
        title: data.title,
        type: 'website',
        locale: 'ja_JP',
        url: currentSiteUrl,
        description: data.description,
      },
    };
  } catch (e) {
    console.error(e);
  }
}
