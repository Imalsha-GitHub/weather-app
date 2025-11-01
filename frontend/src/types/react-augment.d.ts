import "react";

declare module "react" {
  export function useEffect(
    effect: EffectCallback,
    deps?: DependencyList
  ): void;
}
