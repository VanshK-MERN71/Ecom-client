import { useRef } from "react"

const PROMO_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=300&fit=crop", alt: "Nike shoes" },
  { id: 2, src: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Smart watch" },
  { id: 3, src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop", alt: "Skincare products" },
  { id: 4, src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop", alt: "Premium watch" },
  { id: 5, src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", alt: "Headphones" },
  { id: 6, src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop", alt: "Sunglasses" },
  { id: 7, src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop", alt: "Red sneakers" },
  { id: 8, src: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&h=300&fit=crop", alt: " Fashion sneakers" },
]

export default function PromoCarousel() {
  const containerRef = useRef(null)

  const handleMouseEnter = () => {
    if (containerRef.current) {
      containerRef.current.style.animationPlayState = "paused"
    }
  }

  const handleMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.animationPlayState = "running"
    }
  }

  return (
    <div className="w-full overflow-hidden py-8 bg-gradient-to-b from-[#f0e9ff] to-[#90d5f0]/30"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
    >
      <div className="relative w-full" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
        <div
          ref={containerRef}
          className="flex gap-6 w-max"
          style={{
            animation: "scrollPromo 30s linear infinite",
            willChange: "transform",
          }}
        >
          {[...PROMO_IMAGES, ...PROMO_IMAGES].map((img, idx) => (
            <div
              key={`${img.id}-${idx}`}
              className="flex-shrink-0 w-52 h-52 bg-white rounded-2xl shadow-md overflow-hidden p-3 flex items-center justify-center"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scrollPromo {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
