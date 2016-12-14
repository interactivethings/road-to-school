import React, {Component} from 'react';
import * as d3 from 'd3';
import './App.css';

var letters = [
{
  name: 'book',
  LETTER_PATH: 'M69 12.37c0 .415-.065.72-.196.917-.033.05-.29.077-.77.077h-5.91V12.02h4.502c.654 0 .98-.045.98-.134 0-.154-.585-.768-1.757-1.84-1.164-1.08-1.834-1.62-2.01-1.62-.038.048-.085.204-.14.47-.1-.084-.22-.192-.362-.325-.142-.132-.307-.288-.493-.465-.346-.34-.52-.67-.52-.987 0-.327.162-.757.485-1.29.182-.288 2.233-1.23 6.155-2.828l-.68 1.674-4.873 1.98c.08.076.185.167.318.275.134.106.298.23.494.37 1.102.84 2.037 1.635 2.805 2.384.767.75 1.375 1.458 1.823 2.125.098.144.147.33.147.56zm-5.423.994h-5.854V12.02h3.586c.073 0 .11-.064.11-.19 0-.093-.03-.227-.087-.402-.058-.175-.13-.35-.213-.522-.085-.173-.172-.324-.263-.455-.09-.13-.17-.195-.235-.195l.638-1.478c.308.35.57.862.79 1.534.22.64.33 1.21.33 1.71h1.197v1.344zm-1.96-6.793l-1.47-.937.615-.994 1.478.88-.623 1.05zm-3.53-.84l.596-1.035 1.463.938-.602.973-1.457-.875zm1.09 7.634h-1.603c-.453 0-.825-.053-1.117-.158-.292-.105-.507-.27-.644-.497-.138-.227-.207-.627-.207-1.202v-7.19L56.656 3v8.508c0 .34.16.51.477.51h2.044v1.346zm-5.562-1.856c0 .86-.166 1.42-.497 1.68-.127.1-.346.19-.66.274-.312.084-.72.17-1.224.26-.49.08-.96.138-1.41.178-.452.04-.89.06-1.314.06-3.007 0-4.51-.787-4.51-2.36 0-.383.098-.757.294-1.12.065-.122.287-.44.665-.953-.2.644-.302 1.097-.302 1.358 0 .77.53 1.28 1.59 1.527.26.06.6.106 1.012.136.413.03.907.046 1.48.046.328 0 .68-.01 1.062-.032.38-.02.797-.055 1.25-.1 1.242-.123 1.862-.302 1.862-.54 0-.276-.23-.705-.693-1.29l.645-1.407c.5.813.75 1.574.75 2.283zm-3.838 4.412l-.644 1.1-1.576-.918.61-1.1 1.61.918z'
},
{
  name: 'school',
  LETTER_PATH: 'M68.868 12.384c0 .84-.423 1.26-1.268 1.26-.433 0-.966-.103-1.6-.31-.686-.22-1.147-.468-1.384-.742-.19.62-.64.928-1.346.928h-1.917v-1.484c1.814 0 2.806-.062 2.976-.186.092-.077.247-.386.463-.928.155-.386.303-.71.445-.97.142-.26.283-.47.425-.63.142-.16.29-.275.445-.344.154-.07.322-.104.502-.104.578 0 1.11.45 1.6 1.353.217.402.384.782.5 1.14.115.358.168.697.158 1.017zm-.966-.534c0-.165-.046-.343-.136-.533-.09-.19-.2-.37-.328-.534-.13-.165-.274-.3-.433-.41-.16-.108-.315-.162-.464-.162-.097 0-.216.044-.355.13-.14.084-.273.186-.402.304-.13.12-.24.242-.332.37-.092.13-.14.243-.14.34 0 .048.04.102.117.164.078.062.178.125.302.19.123.064.26.127.41.19.148.06.295.115.44.16.144.047.278.086.4.117.125.03.226.046.303.046.412 0 .62-.122.62-.37zm-4.952 1.67h-1.77c-.062.14-.59.276-1.585.41-.825.108-1.454.162-1.887.162-.577 0-.976-.06-1.198-.177-.304-.18-.456-.534-.456-1.06 0-.103.017-.255.05-.456.034-.202.075-.402.124-.6.05-.198.103-.372.162-.522.06-.15.12-.224.182-.224l.03.008v.572c0 .39.04.613.117.665.246.138.674.207 1.282.207.212 0 .44-.01.688-.027.248-.018.518-.047.812-.09.79-.107 1.183-.256 1.183-.447 0-.258-.175-.88-.526-1.863-.36-1.026-.614-1.56-.758-1.6l.866-1.795c.546 1.335.974 3.12 1.283 5.35h1.4v1.485zm-8.02-.394c0 1.32-.52 2.443-1.562 3.37-.897.8-1.763 1.2-2.598 1.2-1.056 0-2.087-.694-3.092-2.08.087.067.2.14.34.216.335.14.678.25 1.028.336.35.085.71.13 1.075.136 1.67 0 2.98-.9 3.93-2.7.066-.133.1-.264.1-.393 0-.7-.522-1.416-1.563-2.148L53.26 9.6c.247.16.474.365.68.615.207.25.383.533.53.85.147.317.26.65.34 1.002.08.35.12.703.12 1.06zm-5.26-1.802c0 .784-.047 1.418-.14 1.902-.443.28-.827.418-1.15.418-1.208 0-2.208-.206-3-.62-.76.357-1.476.535-2.15.535-1.027 0-1.92-.158-2.684-.473-.242.29-.853.433-1.832.433h-1.74v-1.484c.036.02.17.03.402.03 1.742 0 2.696-.092 2.86-.278.083-.092.125-.31.125-.65 0-.2-.022-.4-.07-.594l1.084-1.168c.01.093.02.214.027.363.008.15.012.327.012.533 0 .077-.014.192-.042.344-.03.152-.058.31-.09.476l-.084.452c-.026.136-.04.228-.04.274.017.025.068.053.156.084.428.145 1.023.217 1.786.217h.44c1.026 0 1.578-.058 1.655-.177.057-.072.085-.283.085-.634 0-.34-.018-.573-.054-.697l1.13-1.144c-.017.282-.035.57-.055.86-.022.292-.048.592-.08.902-.02.165-.066.363-.138.595l-.008.03c0 .202.41.302 1.23.302.81 0 1.214-.202 1.214-.604 0-.567-.116-.958-.348-1.175l1.175-1.05c.216.66.325 1.324.325 1.994zM37.992 13.52h-1.214c-.546 0-.912-.13-1.098-.394-.288-.428-.433-1.07-.433-1.925 0-.185.013-.327.04-.424l-.967.974-.078.007c-.314 0-.755-.185-1.322-.556-.613-.39-.92-.73-.92-1.012 0-.17.098-.44.294-.812.448-.876 1.11-1.464 1.987-1.763.362-.123.622-.185.782-.185v-.78l.88-1.16v5.628c.01.618.225.925.643.92h1.407v1.484zM35.17 9.337c0-.845-.028-1.288-.085-1.33-.515.552-1.17.936-1.964 1.153.006.113.076.234.21.363.134.13.292.25.475.367.183.116.373.214.57.294.195.08.354.12.478.12.21 0 .317-.322.317-.967zm.735-5.203L34.28 3.098 34.96 2l1.633.974-.688 1.16zm-3.897-.928l.657-1.144 1.616 1.036-.664 1.075-1.608-.967z'
},
{
  name: 'scientist',
  LETTER_PATH: 'M69.725 11.85l-.54 1.295-2.688.217h-3.97v-1.344h1.793c-.415-.565-.623-1.015-.623-1.35 0-.566.525-1.264 1.575-2.095.294-.224.63-.336 1.008-.336.257 0 .5.052.73.154.227.104.43.245.608.425.177.18.326.393.448.64.12.248.208.514.26.8-.066-.08-.167-.16-.302-.236-.136-.078-.286-.147-.452-.207-.165-.06-.335-.11-.507-.144-.173-.036-.332-.053-.477-.053-.784 0-1.34.336-1.666 1.008l-.007.042c0 .098.054.222.16.37.108.15.265.314.47.49.206.174.386.302.543.386.156.084.288.126.395.126l3.242-.19zm-5.744 1.512H62.38c-.453 0-.825-.052-1.117-.157-.29-.105-.505-.27-.643-.497-.138-.227-.206-.627-.206-1.2V4.315L61.46 3v8.507c0 .34.16.51.477.51h2.044v1.345zm-5.54-8.226l-.573 1.162v6.847l-.358.217h-2.73v-1.344h2.036V5.675l-.37-1.443L57.675 3l.107 1.442.658.694zm-2.207 8.226H54.65c-.088 0-.23-.002-.423-.007-.194-.004-.396-.01-.606-.02-.21-.01-.412-.017-.608-.022-.196-.004-.34-.007-.434-.007-1.82 0-2.733.15-2.738.45l.063.258c.02.056.05.176.09.36l.176.753c.144.653.257 1.24.34 1.764.08.524.117.99.107 1.402 0 .504-.182 1.073-.546 1.708-.078-.84-.178-1.63-.3-2.367-.12-.737-.264-1.43-.427-2.08-.112-.442-.197-.818-.255-1.126-.06-.308-.088-.55-.088-.728 0-.622.19-1.04.567-1.255.215-.116.696-.228 1.442-.336.658-.1 1.13-.148 1.414-.148.102 0 .18.01.23.028l-1.175-1.323-1.535.798.014-.497c.004-.16.26-.486.77-.98.504-.495.84-.743 1.008-.743.252 0 .637.34 1.155 1.023.64.826 1.202 1.41 1.687 1.75h1.653v1.344z'
},
{
  name: 'engineer',
  LETTER_PATH: 'M69 11.784c0 .813-.41 1.22-1.23 1.22-.418 0-.934-.1-1.548-.3-.663-.214-1.11-.454-1.34-.718-.184.598-.618.898-1.302.898h-1.856v-1.437c1.756 0 2.717-.06 2.882-.18.09-.075.24-.374.45-.898.148-.375.292-.688.43-.94.136-.252.273-.455.41-.61.138-.155.28-.266.43-.333.15-.068.313-.1.487-.1.56 0 1.076.435 1.55 1.31.21.388.37.756.482 1.102.113.346.164.674.154.984zm-.937-.517c0-.16-.043-.332-.13-.516-.088-.184-.194-.356-.32-.516-.124-.16-.263-.292-.418-.396-.155-.105-.304-.157-.45-.157-.094 0-.21.042-.343.124-.135.082-.265.18-.39.296-.124.114-.23.234-.32.36-.09.124-.136.233-.136.328 0 .045.037.098.112.157.075.06.172.12.292.184.12.06.252.122.397.182.145.06.287.112.426.157.14.044.27.082.39.112s.217.044.292.044c.4 0 .598-.12.598-.36zm-4.792 1.617h-3.517c.05.055.182.154.397.3.02.07.03.174.03.314 0 .533-.06 1.15-.18 1.848-.165.943-.397 1.415-.696 1.415-.723 0-1.322-.37-1.796-1.115-.32-.498-.574-1.42-.764-2.76H54.91v-1.438h2.15c-.01-.01-.017-.02-.02-.034-.002-.012-.006-.024-.01-.034 0-.4.35-1.2 1.054-2.403.734-1.247 1.267-1.87 1.602-1.87.344 0 .516.767.516 2.304 0 .884-.025 1.366-.075 1.446-.065.064-.14.144-.228.24-.088.094-.192.2-.312.32.02.02 1.248.03 3.683.03v1.438zM59.59 14.65c0-.24-.046-.468-.138-.685-.092-.217-.22-.408-.385-.572-.165-.165-.355-.297-.57-.397-.214-.1-.44-.15-.68-.15h-.187c-.055 0-.095.025-.12.075 0 .345.202.817.606 1.416.434.633.813.95 1.138.95.224 0 .336-.212.336-.636zm-.074-4.13c0-1.1-.12-1.648-.36-1.648-.164 0-.456.36-.875 1.078-.39.684-.603 1.153-.637 1.407.03.04.072.06.127.06.05 0 .13-.01.243-.03.112-.02.245-.05.397-.094.152-.042.318-.1.497-.175.18-.075.367-.168.562-.277.03-.044.044-.152.044-.32zm-3.05 2.364H50.21v-1.437h3.832c.08 0 .12-.068.12-.202 0-.1-.03-.243-.094-.43-.062-.188-.138-.374-.228-.558-.09-.185-.183-.347-.28-.487-.098-.14-.182-.21-.25-.21l.68-1.578c.33.374.61.92.845 1.64.235.682.352 1.29.352 1.825h1.28v1.437zM54.288 4.98l-.69 1.175-1.682-.98.65-1.175 1.722.98zm-2.532 7.904H50.04c-.06.135-.57.267-1.533.396-.8.105-1.407.158-1.827.158-.558 0-.945-.058-1.16-.173-.294-.174-.44-.516-.44-1.025 0-.1.015-.247.047-.44.033-.196.073-.39.12-.58.048-.194.1-.362.157-.507.058-.144.116-.217.176-.217l.03.008v.554c0 .38.038.593.112.643.24.136.654.203 1.243.203.204 0 .426-.008.666-.026.24-.017.502-.046.787-.086.763-.104 1.145-.248 1.145-.433 0-.25-.17-.85-.51-1.804-.348-.993-.593-1.51-.733-1.55l.838-1.735c.53 1.292.943 3.018 1.242 5.18h1.355v1.436zm-8.078-1.796c0 1.162-.07 1.75-.21 1.766-.135.015-.302.03-.5.04-.2.013-.44.02-.72.02-.554 0-1.05-.038-1.486-.113-.435-.073-.843-.196-1.222-.365-.265.22-.57.35-.92.396-.13.016-.477.024-1.04.024 0 1.108-.545 2.038-1.633 2.79-1.102.71-2.227 1.064-3.375 1.064-.614 0-1.145-.045-1.594-.134-.45-.09-.82-.23-1.112-.423-.29-.19-.508-.435-.65-.73-.143-.293-.214-.645-.214-1.054 0-.59.187-1.3.56-2.133.475-1.023.867-1.66 1.176-1.91-.11.15-.217.347-.32.59-.106.24-.2.495-.282.762-.082.267-.15.53-.198.786-.05.258-.075.48-.075.67 0 1.453.94 2.18 2.815 2.18.334-.006.658-.04.973-.1.314-.058.61-.132.887-.22.277-.087.53-.184.76-.29.23-.11.428-.21.598-.304.17-.095.304-.18.404-.25.1-.073.16-.122.18-.147.105-.136.157-.38.157-.735-.01-.244-.037-.49-.082-.737-.045-.247-.11-.49-.195-.726-.085-.237-.19-.462-.318-.677-.128-.215-.28-.41-.454-.584l1.168-1.368c.37.713.628 1.412.778 2.095.05.185.357.277.92.277.47 0 .766-.07.89-.21.11-.12.166-.43.166-.927 0-.19-.023-.325-.067-.405l1.033-1.04c.01.1.017.23.02.393.002.162.003.353.003.573 0 .503-.075.93-.225 1.28-.014.024-.02.05-.02.074 0 .175.333.262 1.002.262.264 0 .48-.007.65-.022.17-.015.305-.04.405-.075.1-.035.168-.085.206-.15.037-.065.056-.145.056-.24 0-.538-.14-.915-.42-1.13l1.242-1.1c.19.15.285.903.285 2.26z'
},
{
  name: 'doctor',
  LETTER_PATH: 'M68.925 13.153h-9.432v-1.317h6.503c0-.04-.047-.123-.14-.244-.095-.12-.218-.25-.37-.39-.154-.14-.327-.28-.52-.42-.19-.14-.38-.26-.57-.36-.524-.278-1.016-.418-1.473-.418-.353 0-.947.17-1.784.508.342-.636.596-1.045.76-1.228.33-.357.764-.535 1.304-.535.8 0 1.745.477 2.833 1.432.375.33.8.632 1.28.906.477.274 1.014.524 1.608.748v1.317zm-8.008 0h-1.57c-.445 0-.81-.052-1.095-.155-.286-.102-.496-.265-.63-.487-.136-.22-.204-.613-.204-1.175V4.29L58.448 3v8.335c0 .334.155.5.466.5h2.003v1.318zm-5.477-1.01c0 .747-.375 1.12-1.125 1.12-.384 0-.857-.092-1.42-.275-.608-.197-1.017-.416-1.228-.658-.17.548-.567.823-1.193.823h-1.702v-1.317c1.61 0 2.49-.055 2.642-.165.082-.068.22-.342.41-.822.138-.343.27-.63.396-.86.125-.232.25-.418.377-.56.126-.142.257-.244.394-.305.14-.062.287-.093.447-.093.512 0 .986.4 1.42 1.2.192.357.34.694.443 1.012.103.318.15.62.14.902zm-.857-.472c0-.145-.04-.303-.12-.472-.08-.17-.177-.327-.292-.474-.113-.146-.24-.267-.383-.363-.142-.095-.28-.143-.41-.143-.088 0-.194.037-.317.113-.124.075-.242.166-.357.27-.114.106-.212.216-.295.33-.082.114-.123.215-.123.302 0 .04.034.09.103.144.068.055.157.11.267.168.11.057.23.113.364.168.13.055.262.103.39.144.128.04.247.076.357.103.11.027.198.04.267.04.366 0 .55-.11.55-.33zm-4.4 1.483h-1.708c-.11.768-.604 1.427-1.482 1.975-.795.504-1.61.755-2.442.755-.438 0-.837-.074-1.196-.223-.36-.15-.668-.354-.926-.617s-.457-.578-.597-.944c-.138-.366-.208-.77-.208-1.208 0-.64.12-1.27.364-1.886.11-.29.206-.495.29-.62.086-.127.155-.19.21-.19 0 .087-.01.217-.034.39-.023.175-.05.357-.08.547-.03.19-.054.37-.074.54-.02.173-.03.304-.03.396 0 .904.273 1.565.822 1.98.608.45 1.2.674 1.777.674.233 0 .478-.048.734-.144.257-.096.5-.222.728-.378.23-.155.435-.336.62-.542.186-.205.33-.416.43-.63V4.29L48.474 3v8.836h1.708v1.317zm-11.824-.85c0 .2-.016.364-.046.49-.03.125-.1.232-.21.32-.11.086-.274.158-.493.215-.22.057-.523.115-.91.175-.65.096-1.236.144-1.758.144-.544 0-.91-.057-1.097-.172-.252-.15-.378-.485-.378-1 0-.08.014-.204.042-.375.026-.172.06-.34.102-.508.04-.167.088-.313.14-.44.053-.125.104-.188.155-.188.01 0 .018.003.027.007v.51c0 .347.034.543.103.59.22.122.6.184 1.14.184.186 0 .39-.008.61-.024.22-.016.46-.042.72-.08.7-.095 1.05-.227 1.05-.397 0-.228-.156-.78-.467-1.653-.32-.91-.545-1.383-.673-1.42l.77-1.59c.08.02.294.69.637 2.01.356 1.412.535 2.48.535 3.202zm-6.013-.124c0 .406-.064.705-.192.897-.032.05-.284.076-.755.076h-5.79v-1.317h4.41c.642 0 .962-.044.962-.13 0-.152-.574-.753-1.722-1.805-1.14-1.055-1.795-1.584-1.97-1.584-.036.046-.08.2-.136.46-.096-.082-.214-.19-.353-.32-.14-.13-.3-.28-.483-.455-.338-.333-.508-.655-.508-.966 0-.32.157-.74.473-1.263.178-.282 2.188-1.206 6.03-2.77l-.666 1.64-4.774 1.94c.077.074.18.163.312.268.13.106.29.227.483.364 1.08.823 1.995 1.602 2.748 2.336.752.734 1.348 1.428 1.787 2.082.096.142.144.325.144.55zm-5.312.973H21.3v-1.317h3.512c.073 0 .11-.062.11-.186 0-.09-.03-.222-.086-.394-.057-.172-.127-.342-.21-.51-.08-.17-.167-.32-.256-.447-.09-.13-.166-.193-.23-.193l.624-1.448c.302.342.56.843.775 1.502.214.626.322 1.184.322 1.674h1.173v1.317zM25.115 6.5l-1.442-.92.604-.975 1.448.865-.61 1.03zm-3.458-.825l.583-1.015 1.433.92-.59.953-1.426-.858zm1.026 7.478h-1.358c-.05.475-.182.922-.395 1.34-.212.42-.484.783-.816 1.092-.33.308-.71.553-1.14.734-.426.18-.878.27-1.353.27-.667 0-1.303-.263-1.907-.79-.594-.52-.953-1.12-1.077-1.797.202.37.604.728 1.208 1.07.608.348 1.127.522 1.557.522.353 0 .702-.062 1.047-.185.345-.124.662-.293.95-.508.288-.215.54-.47.75-.76.214-.294.364-.612.45-.955-.063.014-.125.02-.184.02-.284 0-.55-.046-.8-.14-.25-.094-.466-.223-.65-.388-.187-.165-.333-.357-.44-.577-.108-.22-.162-.455-.162-.706 0-.39.187-.9.557-1.537.403-.69.78-1.036 1.132-1.036.456 0 .822.405 1.097 1.214.21.604.315 1.203.315 1.798h1.22v1.317zm-1.92-1.482c0-.145-.026-.293-.076-.44-.05-.15-.12-.285-.21-.406-.088-.12-.192-.22-.31-.295-.12-.077-.246-.114-.38-.114-.08 0-.158.024-.23.072-.07.048-.133.108-.19.18-.058.075-.103.155-.138.242-.035.086-.052.17-.052.247 0 .086.047.172.14.257.094.084.21.158.35.22.14.06.288.11.446.147.158.037.303.056.436.056.142 0 .212-.055.212-.165zm-4.75 1.133c0 1.17-.462 2.168-1.386 2.99-.796.71-1.564 1.064-2.305 1.064-.937 0-1.852-.615-2.744-1.845.078.06.18.123.302.192.297.123.6.223.912.298.31.076.63.116.954.12 1.482 0 2.643-.798 3.485-2.394.06-.12.09-.235.09-.35 0-.622-.462-1.257-1.386-1.907l.597-1.295c.22.142.422.323.605.545.183.222.34.473.47.755.13.28.23.577.302.888.07.31.106.624.106.94zm-5.518-1.118L9.46 13.153V4.255L10.494 3v8.685zm-4.057-.33c0 .31-.045.598-.137.86-.09.264-.22.493-.386.687-.167.195-.365.346-.594.453-.228.108-.48.16-.754.16-.558 0-1.212-.145-1.962-.438-.403-.16-.604-.46-.604-.898 0-.285.128-.733.384-1.346.265-.645.503-1.027.714-1.146-.142-.2-.213-.34-.213-.418 0-.316.354-.796 1.063-1.44 0 .265.054.51.16.733.11.225.27.423.485.597.014.005.048.03.103.072.055.044.125.096.21.158l.267.196c.093.068.184.136.27.202l.224.17c.06.05.1.08.12.094.434.338.65.773.65 1.303zm-.933.44c0-.124-.297-.435-.89-.933-.6-.504-.966-.755-1.1-.755-.058 0-.13.06-.212.182-.082.12-.16.26-.23.42-.07.16-.132.317-.185.47-.052.154-.08.262-.08.326 0 .055.013.103.036.144.393.353.912.53 1.557.53.737 0 1.105-.13 1.105-.385z'
}
]

class SvgRenderer extends Component {
  constructor() {
    super();
    this.onRef = ref => this.ref = ref;
  }
  componentDidMount() {
    this.renderSvg();
    this.props.force.on('tick', () => {
      this.renderSvg();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    this.renderSvg();
  }

  componentWillUnmount() {
    this.props.force.on('tick', null);
  }

  render() {
    
    return (
      <div>
        <svg width={this.props.width/2} height={this.props.height} ref={this.onRef}>
        </svg>
      </div>
    );
  }

  renderSvg() {
    if (!this.ref) {
      return;
    }

    const svg = d3.select(this.ref);

    /*----------------------------- Main Vis --------------------*/

    const circles = svg.selectAll('path')
      .data(this.props.data, d => d.id);

    circles.enter()
      .append('path');

    circles
      .attr('transform', d => 'translate('+ d.x + ',' + d.y +') scale(' + 1.2 + ')')
      .attr('d', function(d) { return letters[d.letterID].LETTER_PATH; })
      .style('fill', '#191406')
      .call(d3.drag().on("drag", dragged));
    
    circles.exit()
      .remove();

    function dragged(d) {   
      d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);    
    }


  }
}

export default SvgRenderer;
