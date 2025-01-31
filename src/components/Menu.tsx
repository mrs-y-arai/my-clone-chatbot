"use client";

import { Burger, Menu as MantineMenu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

export function Menu() {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <MantineMenu shadow="md" width={200}>
      <MantineMenu.Target>
        <Burger opened={opened} onClick={toggle} aria-label="メニューを開く" />
      </MantineMenu.Target>

      <MantineMenu.Dropdown>
        <MantineMenu.Item onClick={close} prefetch component={Link} href="/">
          ホーム
        </MantineMenu.Item>
        <MantineMenu.Item
          onClick={close}
          prefetch
          component={Link}
          href="/search"
        >
          ナレッジ検索
        </MantineMenu.Item>
      </MantineMenu.Dropdown>
    </MantineMenu>
  );
}
