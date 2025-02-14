import Link from "next/link";
import { Box, Container } from "@theme-ui/components";

export interface TabType {
  name: string;
  href: string;
  as?: string;
  isActive?: boolean;
}

type TabsProps = {
  tabs: Array<TabType>;
};

export default ({ tabs }: TabsProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        mt: 2,
        mx: "auto",
        position: "relative",
        borderBottom: "1px solid",
        borderColor: "muted",
        pb: 2,
      }}
    >
      <Container>
        {tabs.map((tab: TabType, i: number) => (
          <Link key={i} href={tab.href} as={tab.as} passHref>
            <a
              sx={{
                color: tab.isActive ? "black" : "rgba(0,0,0,.6)",
                mr: "22px",
                pb: 2,
                fontSize: 1,
                borderBottom: "3px solid",
                textDecoration: "none",
                borderColor: tab.isActive ? "primary" : "transparent",
              }}
            >
              {tab.name}
            </a>
          </Link>
        ))}
      </Container>
    </Box>
  );
};
