import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
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
import { ExpandMore, Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import { Link, useLocation } from "react-router";
import type { TranslationKey } from "../../i18n/translations.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";
import { AuthDialog } from "./AuthDialog.tsx";
import { useUser } from "../../context/useUser.ts";

interface NavChild {
  labelKey: TranslationKey;
  path: string;
}

interface NavItem {
  key: string;
  labelKey: TranslationKey;
  path: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  { key: "home", labelKey: "nav.home", path: "/" },
  { key: "teachers", labelKey: "nav.teachers", path: "/teachers" },
  {
    key: "education",
    labelKey: "nav.education",
    path: "/education",
    children: [
      { labelKey: "education.bachelor", path: "/education/bachelor" },
      { labelKey: "education.master", path: "/education/master" },
      { labelKey: "education.doctoral", path: "/education/doctoral" },
      { labelKey: "education.curricula", path: "/education/curricula" },
      { labelKey: "education.schedules", path: "/education/schedules" },
    ],
  },
  {
    key: "research",
    labelKey: "nav.research",
    path: "/research/projects",
    children: [
      { labelKey: "research.projects", path: "/research/projects" },
      { labelKey: "research.publications", path: "/research/publications" },
    ],
  },
  { key: "news", labelKey: "nav.news", path: "/news" },
  { key: "contacts", labelKey: "nav.contacts", path: "/contacts" },
  { key: "about", labelKey: "nav.aboutUs", path: "/about" },
  { key: "admin", labelKey: "nav.admin", path: "/admin" },
];

export function NavBar() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const { user, logout } = useUser();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [accountAnchor, setAccountAnchor] = useState<HTMLElement | null>(null);

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

  return (
    <AppBar position="sticky" elevation={2}>
      <Container>
        <Toolbar disableGutters sx={{ gap: 0.5 }}>
          {user ? (
            <IconButton
              color="inherit"
              aria-label={user.name}
              title={user.name}
              onClick={(event) => setAccountAnchor(event.currentTarget)}
            >
              <Avatar
                src={user.photoUrl ?? undefined}
                sx={{ width: 36, height: 36, fontSize: 15, bgcolor: "secondary.main" }}
              >
                {user.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </Avatar>
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              aria-label={t("header.account")}
              title={t("header.account")}
              onClick={() => setAuthOpen(true)}
              sx={{ mr: 0.5 }}
            >
              <AccountCircle sx={{ fontSize: 34 }} />
            </IconButton>
          )}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              flexGrow: 1,
              gap: 1,
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
            <Typography
              variant="subtitle1"
              component={Link}
              to="/"
              sx={{ fontWeight: 700, color: "inherit", textDecoration: "none" }}
            >
              CST
            </Typography>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "stretch",
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
                    sx={{ px: 1.5, height: "100%" }}
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
                        component={Link}
                        to={child.path}
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
                  component={Link}
                  to={item.path}
                  sx={{
                    px: 1.5,
                    fontWeight: pathname === item.path ? 700 : 400,
                    borderBottom: "3px solid",
                    borderColor:
                      pathname === item.path ? "secondary.main" : "transparent",
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

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280 }} role="presentation">
          <Typography
            variant="subtitle1"
            sx={{ px: 2, py: 2, fontWeight: 700, color: "primary.main" }}
          >
            {t("header.department")}
          </Typography>
          <Divider />
          <List onClick={() => setDrawerOpen(false)}>
            {navItems.map((item) =>
              item.children ? (
                <Box key={item.key}>
                  <ListItemButton component={Link} to={item.path}>
                    <ListItemText primary={t(item.labelKey)} />
                  </ListItemButton>
                  {item.children.map((child) => (
                    <ListItemButton
                      key={`${item.key}-${child.labelKey}`}
                      component={Link}
                      to={child.path}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText
                        primary={t(child.labelKey)}
                        slotProps={{ primary: { sx: { fontSize: 14 } } }}
                      />
                    </ListItemButton>
                  ))}
                </Box>
              ) : (
                <ListItemButton key={item.key} component={Link} to={item.path}>
                  <ListItemText primary={t(item.labelKey)} />
                </ListItemButton>
              ),
            )}
          </List>
        </Box>
      </Drawer>

      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />

      {user && (
        <Menu
          anchorEl={accountAnchor}
          open={Boolean(accountAnchor)}
          onClose={() => setAccountAnchor(null)}
          slotProps={{ paper: { sx: { minWidth: 230 } } }}
        >
          <Box sx={{ px: 2, py: 1.25 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {user.name}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
              {user.email} · {user.role}
            </Typography>
          </Box>
          <Divider />
          <MenuItem
            component={Link}
            to="/account"
            onClick={() => setAccountAnchor(null)}
          >
            {t("auth.accountDetails")}
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAccountAnchor(null);
              logout();
            }}
          >
            {t("auth.logout")}
          </MenuItem>
        </Menu>
      )}
    </AppBar>
  );
}
