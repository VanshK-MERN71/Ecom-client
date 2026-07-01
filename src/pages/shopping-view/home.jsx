import { Button } from "@/components/ui/button";
import cat1 from "../../assets/cat1.webp";
import cat2 from "../../assets/cat2.webp";
import cat3 from "../../assets/cat3.webp";
import cat4 from "../../assets/cat4.webp";
import cat5 from "../../assets/cat5.webp";
import bra1 from "../../assets/bra1.png";
import bra2 from "../../assets/bra2.png";
import bra3 from "../../assets/bra3.png";
import bra4 from "../../assets/bra4.png";
import bra5 from "../../assets/bra5.png";
import bra6 from "../../assets/bra6.png";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import Footer from "@/components/admin-view/footer";
import { optimizeImageUrl } from "@/utils/cloudinary";

const categoryImages = {
  men: cat1,
  women: cat2,
  kids: cat3,
  footwear: cat4,
  electronics: cat5,
};

const categoriesWithIcon = [
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "kids", label: "Kids" },
  { id: "footwear", label: "Footwear" },
  { id: "electronics", label: "Electronic" },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", image: bra1 },
  { id: "adidas", label: "Adidas", image: bra2 },
  { id: "puma", label: "Puma", image: bra3 },
  { id: "levi", label: "Levi's", image: bra4 },
  { id: "zara", label: "Zara", image: bra5 },
  { id: "h&m", label: "H&M", image: bra6 },
];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const sectionRefs = [useScrollReveal(), useScrollReveal(), useScrollReveal()];

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const currentSlideRef = useRef(currentSlide);
  currentSlideRef.current = currentSlide;
  const timerRef = useRef(null);
  const isHoveringRef = useRef(false);
  const isTransitioningRef = useRef(false);
  const touchStartRef = useRef(null);
  const preloadedRef = useRef(new Set());

  const slideCount = featureImageList?.length ?? 0;

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  const goToSlide = useCallback((index) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentSlide((index + slideCount) % slideCount);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isTransitioningRef.current = false;
      });
    });
  }, [slideCount]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlideRef.current + 1);
  }, [goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlideRef.current - 1);
  }, [goToSlide]);

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isHoveringRef.current) {
        setCurrentSlide((prev) => (prev + 1) % slideCount);
      }
    }, 2000);
  }, [slideCount]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    if (slideCount < 2) return;
    startAutoplay();
    return () => clearInterval(timerRef.current);
  }, [slideCount, startAutoplay]);

  useEffect(() => {
    if (slideCount < 2) return;
    const urls = [
      (currentSlide - 1 + slideCount) % slideCount,
      (currentSlide + 1) % slideCount,
    ].map((i) => featureImageList[i]?.image).filter(Boolean);
    urls.forEach((url) => {
      if (!preloadedRef.current.has(url)) {
        preloadedRef.current.add(url);
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = optimizeImageUrl(url);
        document.head.appendChild(link);
      }
    });
  }, [currentSlide, featureImageList, slideCount]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = e.touches[0].clientX;
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (touchStartRef.current === null) return;
    const delta = e.touches[0].clientX - touchStartRef.current;
    if (Math.abs(delta) > 50) {
      (delta > 0 ? prevSlide : nextSlide)();
      touchStartRef.current = null;
    }
  }, [nextSlide, prevSlide]);

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null;
    if (!isHoveringRef.current) startAutoplay();
  }, [startAutoplay]);

  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
  }, []);

  const slideIndex = useMemo(() => {
    if (slideCount < 3) return {};
    const prev = (currentSlide - 1 + slideCount) % slideCount;
    const next = (currentSlide + 1) % slideCount;
    return { prev, next };
  }, [currentSlide, slideCount]);

  const carousel = useMemo(() => {
    if (!featureImageList || slideCount === 0) return null;
    return (
      <div
        className="relative w-full min-h-[250px] sm:min-h-[350px] md:min-h-[450px] lg:h-[600px] overflow-hidden bg-muted"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured products"
      >
        {featureImageList.map((slide, index) => {
          const isActive = index === currentSlide;
          const isAdjacent = slideCount >= 3 && (index === slideIndex.prev || index === slideIndex.next);
          return (
            <img
              src={optimizeImageUrl(slide?.image)}
              key={slide?._id || index}
              alt={`Slide ${index + 1}`}
              decoding="async"
              fetchpriority={isActive ? "high" : "low"}
              loading={isActive || isAdjacent ? "eager" : "lazy"}
              className={`${
                isActive ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 bg-muted`}
              style={{
                willChange: "opacity",
                contentVisibility: isActive ? "visible" : "auto",
              }}
              aria-hidden={!isActive}
            />
          );
        })}
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 transition-all duration-200 hover:bg-white hover:scale-105 z-10"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 transition-all duration-200 hover:bg-white hover:scale-105 z-10"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
    );
  }, [featureImageList, currentSlide, slideCount, slideIndex, nextSlide, prevSlide, handleTouchStart, handleTouchMove, handleTouchEnd, handleMouseEnter, handleMouseLeave]);

  return (
    <div className="flex flex-col bg-[#E8BAA3]">
      {carousel}
      <section className="py-12 reveal" ref={sectionRefs[0]}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in-down">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem, idx) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img
                    src={categoryImages[categoryItem.id]}
                    alt={categoryItem.label}
                    className="w-full h-28 sm:h-36 object-contain object-center bg-gray-100 rounded-md mb-4"
                  />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 reveal" ref={sectionRefs[1]}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in-down">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem, idx) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img
                    src={brandItem.image}
                    alt={brandItem.label}
                    className="w-24 h-24 mb-4 object-contain"
                  />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 reveal" ref={sectionRefs[2]}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in-down">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem, idx) => (
                  <div
                    key={productItem._id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <ShoppingProductTile
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddtoCart={handleAddtoCart}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
      <Footer/>
    </div>
  );
}

export default ShoppingHome;
