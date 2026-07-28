"use client";

import { usePathname } from "next/navigation";
import Header2 from "../Header2"; // Подкорректируйте путь к Header2 при необходимости

export default function HeaderWrapper() {
  const pathname = usePathname();

  // Если путь равен главной странице ("/"), не показываем хедер
  if (pathname === "/" || pathname === "/git-registration") {
    return null;
  }

  return <Header2 />;
}