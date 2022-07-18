// 首页轮播数据
import Mock from 'mockjs'

Mock.mock('/api/banner', 'get', {
    code: 0,// 正常状态码
    msg: '', // 正常消息
    // code: 406,// 错误状态码
    // msg: '发生错误了哦', // 错误消息
    data: [
        {
            id: 1,
            midImg: 'http://mdrs.yuanjin.tech/img/20201031141507.jpg',
            bigImg: 'http://mdrs.yuanjin.tech/img/20201031141350.jpg',
            title: '凛冬将至',
            description: '人唯有恐惧的时候方能勇敢'
        },
        {
            id: 2,
            midImg: 'http://mdrs.yuanjin.tech/img/20201031205550.jpg',
            bigImg: 'http://mdrs.yuanjin.tech/img/20201031205551.jpg',
            title: '血火同源',
            description: '如果我回头，一切都晚了'
        },
        {
            id: 3,
            midImg: 'http://mdrs.yuanjin.tech/img/20201031204401.jpg',
            bigImg: 'http://mdrs.yuanjin.tech/img/20201031204403.jpg',
            title: '听我怒吼',
            description: '兰尼斯特有债必偿'
        }
    ]
})