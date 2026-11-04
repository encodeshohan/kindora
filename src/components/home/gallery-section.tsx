import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";

const photos = [1, 2, 3, 4, 5, 6];

export default function GallerySection() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <SectionHeading
                eyebrow="Gallery"
                title="Our community in action"
                description="Neighbours, volunteers and friends turning good intentions into real results."
            />
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {photos.map((number) => (
                    <div
                        key={number}
                        className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted"
                    >
                        <Image
                            src={`/gallery/${number}.jpg`}
                            alt={`Community volunteers in action, photo ${number}`}
                            fill
                            sizes="(min-width: 1024px) 33vw, 50vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                ))}
            </div>
        </section>
    );
}