import { Box, Flex } from "@theme-ui/components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { SxStyleProp } from "theme-ui";
import BulletSvg from "./bullet-svg";

type Heading = { content: string; slug?: string; iconComponentName?: string };
export type Tree = [Heading, Tree[]] | [];

type Props = {
  tree: Tree[];
  onClose?: (() => void) | null;
  ignoreList?: string[];
};

function flatten(items) {
  const flat = [];

  items.forEach((item) => {
    if (Array.isArray(item)) {
      flat.push(...flatten(item));
    } else {
      flat.push(item);
    }
  });

  return flat;
}

const IconContainer: React.FC<{ pushSx?: SxStyleProp }> = ({
  children,
  pushSx
}) => (
  <i
    sx={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      mr: "12px",
      width: "16px",
      height: "16px",
      color: "text",
      ...pushSx
    }}
  >
    {children}
  </i>
);

const TableOfContents = ({ onClose = null, tree, ignoreList = [] }: Props) => {
  function renderHeading(
    heading: Heading,
    hasChildren = false,
    isChildren = false
  ) {
    const { pathname } = useRouter();
    const isActive = pathname === heading.slug;

    const Icon =
      require(`react-icons/fi`)[heading.iconComponentName] ?? BulletSvg;

    if (heading === undefined || ignoreList.includes(heading.content)) {
      return null;
    }

    if (hasChildren) {
      return (
        <Box
          sx={{
            color: "black",
            alignItems: "center",
            display: "flex",
            pl: "0",
            py: "12px"
          }}
        >
          <IconContainer>
            <Icon />
          </IconContainer>
          {heading.content}
        </Box>
      );
    }
    const labelStyles = {
      fontSize: "10px",
      color: "white",
      fontWeight: 600,
      px: 2,
      py: "2px",
      borderRadius: 4
    };
    return (
      <Link href={heading.slug} passHref>
        <a
          onClick={onClose}
          sx={{
            fontSize: "16px",
            color: isActive ? "primary" : "black",
            fontWeight: isActive ? 600 : 400,
            borderLeft: "1px solid",
            borderColor: isChildren
              ? isActive
                ? "primary"
                : "#eaeaea"
              : "transparent",
            alignItems: "center",
            py: isChildren ? "8px" : "12px",
            pl: isChildren ? "12px" : "0",
            display: "flex",
            ":hover": {
              color: "primary"
            }
          }}
        >
          <IconContainer>
            <Icon />
          </IconContainer>
          <Box
            sx={{
              ...(heading.content === "POST" && {
                bg: "green",
                ...labelStyles
              }),
              ...(heading.content === "GET" && {
                bg: "blue",
                ...labelStyles
              }),
              ...(heading.content === "DELETE" && {
                bg: "red",
                ...labelStyles
              }),
              ...(heading.content === "PUT" && {
                bg: "orange",
                ...labelStyles
              })
            }}
          >
            {heading.content}
          </Box>
        </a>
      </Link>
    );
  }

  function renderChildren(children: Tree[]) {
    if (children.length === 0) {
      return null;
    }

    return (
      <>
        {children.map((child, i) => (
          <Box key={i}>{renderPair(child, true)}</Box>
        ))}
      </>
    );
  }

  function renderPair(pair: Tree, isChildren = false) {
    const [isOpen, setIsOpen] = useState(false);
    const [heading, children] = pair;
    const hasChildren = children?.length > 0;
    const router = useRouter();
    const isActive = flatten(children).filter(
      (obj) => obj.slug === router?.pathname
    ).length;
    if (ignoreList.includes(heading.content)) return <></>;
    return (
      <>
        <Flex
          onClick={() => setIsOpen(isOpen ? false : true)}
          sx={{
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Box>{renderHeading(heading, hasChildren, isChildren)}</Box>
          {hasChildren && (
            <>
              {isOpen || isActive ? (
                <IconContainer pushSx={{ m: 0 }}>
                  <FiChevronUp />
                </IconContainer>
              ) : (
                <IconContainer pushSx={{ m: 0 }}>
                  <FiChevronDown />
                </IconContainer>
              )}
            </>
          )}
        </Flex>
        {hasChildren && (
          <Box
            sx={{
              display: isOpen || isActive ? "block" : "none",
              my: 0,
              pl: "8px"
            }}
          >
            {renderChildren(children)}
          </Box>
        )}
      </>
    );
  }

  function render(tree: Tree) {
    const [heading, children] = tree;

    let Toc = renderPair(tree);

    if (heading) {
      Toc = renderPair(tree);
    } else {
      Toc = renderChildren(children);
    }
    return Toc;
  }

  return (
    <>
      {tree.map((t, i) => (
        <div key={`tree-${i}`}>{render(t)}</div>
      ))}
    </>
  );
};

export default TableOfContents;
