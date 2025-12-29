import Link from 'next/link';
import Image from 'next/image';
import { getBlogViews, getTweetCount, getRepoCount } from 'lib/metrics';
import {
  ArrowIcon,
  GitHubIcon,
} from 'components/icons';
import { name, avatar } from 'lib/info';

export const revalidate = 60;

export default async function HomePage() {
  let repoCount, views, tweetCount;

  try {
    [repoCount, views, tweetCount] = await Promise.all([
      getRepoCount(),
      getBlogViews(),
      getTweetCount(),
    ]);
  } catch (error) {
    console.error(error);
  }

  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">{name}</h1>
      <p className="my-5 max-w-[460px] text-neutral-200 dark:text-neutral-800">
        Hello, I'm Nathaniel! If you've happened upon my website, you're likely one of the following: 
        a friend, a coworker, a recruiter, or someone who stumbled here by accident. There's not much here right now, but I hope that eventually there will be. Nice to meet you!
      </p>
      <div className="flex items-start md:items-center my-8 flex-col md:flex-row">
        <Image
          alt={name}
          className="rounded-full grayscale"
          src={avatar}
          placeholder="blur"
          width={100}
          priority
        />
        <div className="mt-8 md:mt-0 ml-0 md:ml-6 space-y-2 text-neutral-400 dark:text-neutral-500">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/Nathaniel-Nemenzo"
            className="flex items-center gap-2"
          >
            <GitHubIcon />
            {`github`}
          </a>
                    <Link href="/blog" className="flex items-center gap-2">
            <ArrowIcon />
            <p className="h-7">linkedin</p>
          </Link>
        </div>
      </div>
      <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-400 dark:text-neutral-500">
        <li>
          <a
            className="flex items-center hover:text-neutral-200 dark:hover:text-neutral-700 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://linkedin.com/in/nnemenzo"
          >

          </a>
        </li>
      </ul>
    </section>
  );
}
