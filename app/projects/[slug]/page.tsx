import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mdx } from 'components/mdx';
import { allProjects } from 'contentlayer/generated';
import Balancer from 'react-wrap-balancer';
import { GitHubIcon } from 'components/icons';

export async function generateStaticParams() {
    return allProjects.map((project) => ({
        slug: project.slug
    }));
}

export async function generateMetadata({
    params
}): Promise<Metadata | undefined> {
    const project = allProjects.find((project) => project.slug === params.slug)
    if (!project) {
        return;
    }

    const {
        title,
        publishedAt: publishedTime,
        summary: description,
        image,
        slug,
    } = project;
    const ogImage = image
    ? `https://nnemenzo.com${image}`
    : `https://nnemenzo.com/api/og?title=${title}`;

    return {
        title,
        description,
        openGraph: {
          title,
          description,
          type: 'article',
          publishedTime,
          url: `https://nnemenzo.com/projects/${slug}`,
          images: [
            {
              url: ogImage,
            },
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          images: [ogImage],
        },
      };
}

export default async function Project({ params }) {
    const project = allProjects.find((project) => project.slug === params.slug);
    if (!project) {
        notFound();
    }

    return (
        <section>
          <script type="application/ld+json">
            {JSON.stringify(project.structuredData)}
          </script>
          <h1 className="font-bold text-3xl font-serif max-w-[650px]">
            <Balancer>{project.title}</Balancer>
          </h1>
          <div className="grid grid-cols-[0.15fr_0.23fr_auto] items-center mt-4 mb-8 font-light text-sm max-w-[650px]">
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-md px-2 py-1 tracking-tighter mr-2">
              {project.publishedAt}
            </div>
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-md px-2 py-1 tracking-tighter">
                <a href={project.link}>
                    <div className="flex items-center">
                        <GitHubIcon />
                        <div className="ml-3">Link to repository</div>
                    </div>
                </a>
            </div>
            {/* <ViewCounter slug={project.slug} trackView /> */}
          </div>
          <hr/>
          <Mdx code={project.body.code} />
        </section>
      );
}