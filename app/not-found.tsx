import Link from "next/link";
import { ArrowRightIcon } from "../components/icons";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-5 text-center">
      <p className="text-sm font-medium tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
        Halaman tidak ditemukan
      </p>
      <h1 className="mt-4 text-6xl font-semibold tracking-tight text-zinc-900 sm:text-7xl dark:text-zinc-50">
        404
      </h1>
      <p className="mt-4 max-w-md text-zinc-600 dark:text-zinc-400">
        Sepertinya halaman yang kamu cari sudah dipindah, atau belum pernah ada.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500"
      >
        Kembali ke beranda
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}