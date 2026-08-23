import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { ExpandMore, Menu as MenuIcon } from "@mui/icons-material";
import type { TranslationKey } from "../../i18n/translations.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

interface NavChild {
  labelKey: TranslationKey;
}

interface NavItem {
  key: string;
  labelKey: TranslationKey;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  { key: "home", labelKey: "nav.home" },
  {
    key: "about",
    labelKey: "nav.aboutUs",
    children: [
      { labelKey: "aboutUs.department" },
      { labelKey: "aboutUs.headOfDept" },
      { labelKey: "aboutUs.accreditation" },
      { labelKey: "aboutUs.history" },
    ],
  },
  { key: "teachers", labelKey: "nav.teachers" },
  {
    key: "education",
    labelKey: "nav.education",
    children: [
      { labelKey: "education.bachelor" },
      { labelKey: "education.master" },
      { labelKey: "education.doctoral" },
      { labelKey: "education.curricula" },
      { labelKey: "education.schedules" },
    ],
  },
  {
    key: "research",
    labelKey: "nav.research",
    children: [
      { labelKey: "research.publications" },
      { labelKey: "research.projects" },
    ],
  },
  { key: "news", labelKey: "nav.news" },
  { key: "contacts", labelKey: "nav.contacts" },
];

export function NavBar() {
  const { t } = useLanguage();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    key: string,
  ) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(key);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setExpandedItem(null);
  };

  return (
    <AppBar position="sticky" elevation={2}>
      <Container>
        <Toolbar disableGutters sx={{ gap: 0.5 }}>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              CST
            </Typography>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {navItems.map((item) =>
              item.children ? (
                <Box key={item.key}>
                  <Button
                    color="inherit"
                    endIcon={<ExpandMore />}
                    onClick={(event) => handleOpenMenu(event, item.key)}
                    sx={{
                      px: 1.5,
                      fontWeight:
                        openMenu === item.key && anchorEl ? 700 : 400,
                    }}
                  >
                    {t(item.labelKey)}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={openMenu === item.key}
                    onClose={handleCloseMenu}
                    slotProps={{ paper: { sx: { minWidth: 220 } } }}
                  >
                    {item.children.map((child) => (
                      <MenuItem
                        key={child.labelKey}
                        onClick={handleCloseMenu}
                        sx={{ fontSize: 14 }}
                      >
                        {t(child.labelKey)}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : (
                <Button
                  key={item.key}
                  color="inherit"
                  href="#"
                  sx={{
                    px: 1.5,
                    fontWeight: item.key === "home" ? 700 : 400,
                    borderBottom: 3,
                    borderColor:
                      item.key === "home" ? "secondary.main" : "transparent",
                    borderRadius: 0,
                  }}
                >
                  {t(item.labelKey)}
                </Button>
              ),
            )}
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 280 }} role="presentation">
          <Typography
            variant="subtitle1"
            sx={{ px: 2, py: 2, fontWeight: 700, color: "primary.main" }}
          >
            {t("header.department")}
          </Typography>
          <Divider />
          <List>
            {navItems.map((item) =>
              item.children ? (
                <Box key={item.key}>
                  <ListItemButton
                    onClick={() =>
                      setExpandedItem(
                        expandedItem === item.key ? null : item.key,
                      )
                    }
                  >
                    <ListItemText primary={t(item.labelKey)} />
                    <ExpandMore
                      sx={{
                        transform:
                          expandedItem === item.key
                            ? "rotate(180deg)"
                            : "none",
                        transition: "transform 0.2s",
                      }}
                    />
                  </ListItemButton>
                  <Collapse
                    in={expandedItem === item.key}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List disablePadding>
                      {item.children.map((child) => (
                        <ListItemButton
                          key={child.labelKey}
                          sx={{ pl: 4 }}
                          onClick={closeDrawer}
                        >
                          <ListItemText
                            primary={t(child.labelKey)}
                            slotProps={{ primary: { sx: { fontSize: 14 } } }}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              ) : (
                <ListItemButton key={item.key} onClick={closeDrawer}>
                  <ListItemText primary={t(item.labelKey)} />
                </ListItemButton>
              ),
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
