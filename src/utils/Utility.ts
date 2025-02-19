// like flixel's randomObj func i think...
export function randomObject(x: any): any {
  return x[Math.floor(Math.random() * x.length)];
}
