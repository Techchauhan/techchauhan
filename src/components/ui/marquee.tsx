import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import { useRouter } from "next/navigation";

const ReviewCard = ({
  id,
  img,
  name,
  username,
  body,
}: {
  id: string;
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${id}`);
  };

  return (
    <figure
      onClick={handleClick}
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 mx-4 transition transform hover:scale-105 hover:shadow-lg",
        // light styles
        "border-gray-700 bg-gray-800 hover:bg-gray-700",
        // dark styles
        "dark:border-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-gray-200 dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-gray-400 dark:text-gray-400">
            {username}
          </p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-gray-300 dark:text-gray-400">
        {body}
      </blockquote>
    </figure>
  );
};

interface MarqueeDemoProps {
  reviews: Array<{
    id: string;
    img: string;
    name: string;
    username: string;
    body: string;
  }>;
}

export function MarqueeDemo({ reviews }: MarqueeDemoProps) {
  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <div className="relative flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-gradient-to-r from-indigo-900 via-gray-900 to-purple-900 shadow-lg p-6">
      {/* Heading */}
      <h2 className="mb-6 text-2xl font-bold text-white">Recent Post</h2>

      {/* First Marquee Row */}
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </Marquee>

      {/* Second Marquee Row with Reverse Animation */}
      <Marquee reverse pauseOnHover className="[--duration:20s] mt-4">
        {secondRow.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </Marquee>

      {/* Left Glow Effect */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-indigo-800 to-transparent opacity-50"></div>

      {/* Right Glow Effect */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-purple-800 to-transparent opacity-50"></div>
    </div>
  );
}
