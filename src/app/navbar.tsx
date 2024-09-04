import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-red-400 py-3 px-5">
      <div className="flex gap-3 items-center">
        <Image
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAe1BMVEUAAAD////6RSl8fHyfn592dnb/SCs1NTXCwsJRUVH09PR5eXmnp6fw8PCysrLk5OQmJiZYWFgSEhLPz89eGg+GhoaGJRaZmZl8IhRnZ2diYmLq6urc3NyPj49ubm67u7tGRkYcHBw4EAnlPyZoHRFyHxIbCASRKBiZKxlJpD7+AAAB2ElEQVRoge2X2XaCQAyGGYQRERFZXFq3qq19/ydskSQOFcocJ6c3zX/lcPQD82fD80QikUgkEon+TuNRiOKHR4q04Wbnd7YquOGVAVcZM3xuwle87InJVq+88LQFVy+c7DyGRwZ4xAmfAnQCN1Gc8G2DjCnbd3zsMSATb89vaYJR8Ty0dMEGnzXA2ffHAuAHLnYIwNS7W8tmaXGPipdhvlQ87Axw89vp0Do5K2h1lAXG5cgCBztV3j6mHOwNwLCL4x+JcwY4FuUUzlhRauTOzh4eFJNn6w7fPVQNDaWxMxy7rFHvCE9c2TiCZsa1qOPaU8KaCYxrlOp7N/YbVntr4GOqO+4YVScGU91xx4ARpKJVYIjGdTBM6BcVTI+cBlI6AHdaG+MhuMOOMR1iu1haDMOfXhuH7KxlWnoqT/Zw3Ci24einQrKa1sbyrLU+X2zhv81i7MTULUutfd/XurRj40bRvUWQH2DpuWbXsoPjz7vTjW5dwYMDW1sFhuzs2dwwaM2OsST40ga+6sgHU2TpsT5dCP5uA8e+2tec6E3mtmN8+Ai3YdNE6J2U+A7WjG6Ii11Uhmc8xg0svepaVxu2hw28fxHPE/gK1sH6c22FFolEIpFIJPqf+gKRfhDkVk0VSQAAAABJRU5ErkJggg=="
          alt="logo"
          width={40}
          height={40}
          className="rounded-md"
        />
        <h1 className="text-white font-bold text-xl">AMBISIUS TEST</h1>
      </div>
    </nav>
  );
}
