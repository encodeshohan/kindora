import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";

// Edit each "alt" to describe what is actually in the matching photo (5 to 10 words).
const photos = [
    { src: "/gallery/1.jpg", alt: "Volunteers taking part in a community event" },
    { src: "/gallery/2.jpg", alt: "Neighbours working together outdoors" },
    { src: "/gallery/3.jpg", alt: "Volunteers helping their community" },
    { src: "/gallery/4.jpg", alt: "A group of volunteers smiling together" },
    { src: "/gallery/5.jpg", alt: "Community members sharing a project" },
    { src: "/gallery/6.jpg", alt: "People joining a local service activity" },
];

export default function GallerySection() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <SectionHeading
                eyebrow="Gallery"
                title="Our Community in Action"
                description="Neighbours, volunteers and friends turning good intentions into real results."
            />
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {photos.map((photo) => (
                    <div
                        key={photo.src}
                        className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted"
                    >
                        <Image
                            src={photo.src}
                            alt={photo.alt}
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