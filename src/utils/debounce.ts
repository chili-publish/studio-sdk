export const debounce = (fn: (...params: unknown[]) => unknown, n: number) => {
    let timer: NodeJS.Timeout | undefined = undefined;
    return function (this: unknown, ...args: unknown[]) {
      if (timer === undefined) {
        fn.apply(this, args);
      }
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), n);
      return timer;
    }
  };