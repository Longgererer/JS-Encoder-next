# lint
echo -e "\e[1;44;37m 执行eslint \e[0m"
eslint --ext .ts,.vue src/ --fix
echo ""

echo -e "\e[1;44;37m 执行stylelint \e[0m"
stylelint "./src/**/*.{css,scss,vue}" --fix
echo ""

echo -e "\e[1;44;37m lint检查完毕 \e[0m"
echo ""

# lint报错直接退出


# 启动
echo -e "\e[1;42;37m 启动vite \e[0m"
vite