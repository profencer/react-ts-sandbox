export default (block: string) => 
    (el?: string) => 
        el ? `${block}__${el}` : block;