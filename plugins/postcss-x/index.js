import postcss from 'postcss';

export default postcss.plugin('postcss-x', () => {
  return root => {
    // css 文件级别
    root.walkRules(rule => {
      // css class级别
      rule.walkDecls(/^one-line-box/, decl => {
        // css 单条样式
        let height = parseFloat(decl.value);
        let decl1 = postcss.decl({prop: 'height', value: `${height}px`});
        let decl2 = postcss.decl({prop: 'line-height', value: `${height}px`});
        let decl3 = postcss.decl({prop: 'text-overflow', value: `ellipsis`});
        let decl4 = postcss.decl({prop: 'white-space', value: `nowrap`});
        let decl5 = postcss.decl({prop: 'overflow', value: `hidden`});
        rule.append(decl1, decl2, decl3, decl4, decl5);
        decl.remove();
      });
    });
  };
});
