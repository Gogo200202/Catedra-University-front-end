import { useEffect, useState } from "react";
import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight, Rocket, School, Groups } from "@mui/icons-material";
import type { TranslationKey } from "../../i18n/translations.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

interface Slide {
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  ctaKey: TranslationKey;
  gradient: string;
  Icon: typeof School;
}

const slides: Slide[] = [
  {
    titleKey: "slide1.title",
    subtitleKey: "slide1.subtitle",
    ctaKey: "slide1.cta",
    gradient: "linear-gradient(135deg, #0d3b66 0%, #1e5f9e 60%, #3f8fd2 100%)",
    Icon: School,
  },
  {
    titleKey: "slide2.title",
    subtitleKey: "slide2.subtitle",
    ctaKey: "slide2.cta",
    gradient: "linear-gradient(135deg, #082845 0%, #14528c 55%, #2d7fc1 100%)",
    Icon: Rocket,
  },
  {
    titleKey: "slide3.title",
    subtitleKey: "slide3.subtitle",
    ctaKey: "slide3.cta",
    gradient: "linear-gradient(135deg, #123a5e 0%, #275f96 55%, #4a90c9 100%)",
    Icon: Groups,
  },
];

const AUTO_ADVANCE_MS = 6000;

export function HeroSlider() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActiveIndex((i) => (i + 1) % slides.length),
      AUTO_ADVANCE_MS,
    );
    return () => clearInterval(timer);
  }, [activeIndex]);

  const goTo = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: 380, sm: 440, md: 500 },
        overflow: "hidden",
      }}
    >
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;
        const { Icon } = slide;
        return (
          <Box
            key={slide.titleKey}
            aria-hidden={!isActive}
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              background: slide.gradient,
              opacity: isActive ? 1 : 0,
              visibility: isActive ? "visible" : "hidden",
              transition: "opacity 0.8s ease, visibility 0.8s ease",
            }}
          >
            <Container>
              <Stack
                spacing={2}
                useFlexGap
                sx={{ alignItems: { xs: "center", md: "flex-start" } }}
              >
                <Icon sx={{ fontSize: 64, color: "rgba(255,255,255,0.9)" }} />
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    color: "common.white",
                    fontWeight: 700,
                    textShadow: "0 2px 8px rgba(0,0,0,0.35)",
                    maxWidth: 760,
                    fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
                  }}
                >
                  {t(slide.titleKey)}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    fontWeight: 400,
                    maxWidth: 640,
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  {t(slide.subtitleKey)}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  href="#"
                  sx={{ mt: 1, px: 4, fontWeight: 700 }}
                >
                  {t(slide.ctaKey)}
                </Button>
              </Stack>
            </Container>
          </Box>
        );
      })}

      <IconButton
        aria-label="Previous slide"
        onClick={() => goTo(activeIndex - 1)}
        sx={{
          position: "absolute",
          left: { xs: 4, md: 16 },
          top: "50%",
          transform: "translateY(-50%)",
          color: "common.white",
          bgcolor: "rgba(0,0,0,0.25)",
          "&:hover": { bgcolor: "rgba(0,0,0,0.45)" },
        }}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        aria-label="Next slide"
        onClick={() => goTo(activeIndex + 1)}
        sx={{
          position: "absolute",
          right: { xs: 4, md: 16 },
          top: "50%",
          transform: "translateY(-50%)",
          color: "common.white",
          bgcolor: "rgba(0,0,0,0.25)",
          "&:hover": { bgcolor: "rgba(0,0,0,0.45)" },
        }}
      >
        <ChevronRight />
      </IconButton>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: "absolute",
          bottom: 16,
          left: 0,
          right: 0,
          justifyContent: "center",
        }}
      >
        {slides.map((slide, index) => (
          <Box
            key={slide.titleKey}
            component="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goTo(index)}
            sx={{
              width: index === activeIndex ? 28 : 12,
              height: 12,
              p: 0,
              border: "none",
              borderRadius: 999,
              cursor: "pointer",
              backgroundColor:
                index === activeIndex
                  ? "secondary.main"
                  : "rgba(255,255,255,0.6)",
              transition: "width 0.3s ease, background-color 0.3s ease",
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
