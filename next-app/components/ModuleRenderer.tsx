import { moduleMapper } from "@/lib/moduleMapper";

type Props = {
  modules: any[];
};

export default function ModuleRenderer({ modules }: Props) {
  if (!modules?.length) return null;

  return (
    <>
      {modules.map((module, index) => {
        const Component = moduleMapper[module._type];

        if (!Component) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`No component mapped for: ${module._type}`);
          }
          return null;
        }

        return <Component key={module._key || index} {...module} />;
      })}
    </>
  );
}
