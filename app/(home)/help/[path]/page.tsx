import { notFound } from 'next/navigation';
import React from 'react';
import { getHelpData } from '../lib/getHelpData';
import { Article, WithContext } from 'schema-dts';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllHelpPath } from '../lib/getAllHelpPath';

export default async function HelpPage({ params: { path } }) {
  const basePath = (publicRuntimeConfig && publicRuntimeConfig.basePath) || '';
  try {
    const data = await getHelpData(path);
    // mdのheader部分を除去したファイルを準備する
    const renderFile: string = data.file.replace(/^---[\s\S]*?---/, '');
    const jsonLd: WithContext<Article> = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      description: data.description,
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
                  src={src.startsWith('http') ? src : './help/' + path + src.replace(/^.\//g, '/')}
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
    console.error(e);
    notFound();
  }
}
export async function generateStaticParams(): Promise<{ path: string }[]> {
  const recentArticles = await getAllHelpPath();
  return recentArticles.map((path) => ({
    path: path.replace(/\//g, ''),
  }));
}
export async function generateMetadata({ params: { path } }) {
  try {
    const data = await getHelpData(path);
    const currentSiteUrl = `/help/${path}`;
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
