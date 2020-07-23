# 题目

使用函数的方式进行解答。

1. 编写函数，完成取余运算，使其结果和%的结果一致。

   ```js
       var x=Number(prompt());
       var y=Number(prompt());
   
       function mod(a,b){
         return x-parseInt( x/y)*y;
   
       }
       console.log(mod(x,y));
   ```

   

2. 检查字符串是否含有大写字母，小写字母以及_,     $,如果有，则返回时缺少了哪些字符。

   ```js
       var x='djbfhjegE_ej'
       var b=c=d=e=0;
   
       function judge(a){
   
         for(var i=0;i<a.length;i++)
           {
             var newstr = a.charAt(i);
               if(newstr>='A'&& newstr<='Z'){
                   b++;
                 }
               if(newstr>='a'&& newstr<='z'){
                   c++;
                 }
               if(newstr==='_'){
                   d++;
                 }
               if(newstr==='$'){
                   e++;
                 }
           }
   
           if(b==0)
           {
             console.log("无大写字母");
           }
   
           if(c==0)
           {
             console.log("无小写字母");
           }
   
           if(d==0)
           {
             console.log("无下划线");
           }
   
           if(e==0)
           {
             console.log("无美元符号");
           }
       }
       
   judge(x);
   ```

   

3. 模拟一个场景，isen老师批改你们github作业的场景。16人。假设第一次提交就通过的概率是1/8，第二次提交通过的概率为85%，第三次都通过了。问，可爱的isen老师可能会批改多少次你们作业。

   ```js
   <script>
       function homework(){
         var num1=num2=0;
         var sum=0;
         var firstcount=secondcount=0;
   
         for(var i=1;i<=16;i++)
         {
           num1=Math.random();
           if (num1<=1/8)
           {
             firstcount++;
           }
         }
         
         if(firstcount==16)
         {
           sum=16;
         }
         else{
           var second=16-firstcount;
           for(var j=1;j<=second;j++)
   
           {
             num2=Math.random();
             if(num2<=0.85)
             {
               secondcount++;
             }
           }
           
           var third=second-secondcount;
          
           sum=16+secondcount+third;
         }
   
         return sum;
   
       }
       var sum=homework();
       console.log(sum);
     </script>
   ```

   

   