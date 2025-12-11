import { HomeBanner } from "@/components";

const bannerData = {
  title: `What You Should Know About “Sharktober” On Maui`,
  description:
    "As stunning southern Colorado scenery passes by, a handful of men learns to operate a live steam engine on the Cumbres & Toltec Scenic Railway",
  image:
    "https://cdn.pixabay.com/photo/2014/10/25/21/57/bay-503139_960_720.jpg",
  author: "LISA TRUESDALE",
  buttonLabel: "Read Full Story",
  buttonLink: "#",
};

export default function Home() {
  return (
    <div className="md:min-h-screen">
      <main>
        <HomeBanner {...bannerData} />
      </main>
    </div>
  );
}
