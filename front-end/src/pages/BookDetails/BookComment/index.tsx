import { Avatar, Box, Divider, Link, Pagination, Rating, Stack, SxProps, Theme, Typography } from "@mui/material";
import { deepOrange, deepPurple, green, grey, red } from "@mui/material/colors";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

export function BookComment({ sx = undefined }: { sx?: SxProps<Theme> | undefined }) {
    return (
        <Box sx={{ ...sx, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography sx={{ fontWeight: 'medium' }} fontSize={'large'}>
                Bình luận sản phẩm
            </Typography>
            <Box display={'flex'} gap={0.5} justifyContent={'center'} py={1}>
                <Typography>Chỉ có thành viên mới có thể viết nhận xét. Vui lòng</Typography>
                <Link sx={{ textDecoration: 'none', color: red['700'], fontWeight: 'medium', cursor: 'pointer' }}>đăng nhập</Link>
                <Typography>hoặc</Typography>
                <Link sx={{ textDecoration: 'none', color: red['700'], fontWeight: 'medium', cursor: 'pointer' }}>đăng ký</Link>
            </Box>
            <Box display={'flex'} width={'100%'} alignItems={'flex-start'}>
                <Box display={'flex'} gap={1.5} alignItems={'center'} sx={{ width: '20%', flexShrink: 0 }}>
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                    <Stack gap={0.5}>
                        <Typography sx={{ fontWeight: 'medium', fontSize: 16, lineHeight: 1 }}>Nguyễn Tuấn</Typography>
                        <Typography sx={{ fontSize: 14, color: grey['A700'] }}>30/03/2025</Typography>
                    </Stack>
                </Box>
                <Stack spacing={1}>
                    <Rating value={5} size="small" readOnly />
                    <Typography fontSize={'small'}>
                        Một trong những tác phẩm kinh điển, bestseller nên đọc. Sách kể về câu chuyện của một cậu bé chăn cừu trên con đường đi tìm kiếm kho báu khổng lồ. Câu chuyện đem đến cho bản thân em nhiều suy nghĩ và liên tưởng về cuộc sống này. Con đường cậu đi, những ngôi làng, những sa mạc, những con người cùng những cuộc gặp gỡ. Cuộc sống chính được tạo nên từ những điều như thế. Trong hành trình tiến về phía trước luôn có những khó khăn, vất vả, những mất mát hay cả những thất bại. Nhưng chúng ta nhất định phải bản lĩnh và kiên cường. Tuyệt đối không bị gục ngã trước nghịch cảnh. Và định nghĩa về những điều quý giá, chúng vẫn luôn hiện hữu xung quanh chúng ta, là tình thân, tình bạn, tình yêu,... Vậy nên đừng tìm kiếm xa xôi, hãy luôn quý trọng tất cả những gì mà mình đang có. Hẳn cuốn sách còn đem lại nhiều hơn những suy nghĩ sâu sắc, đây chỉ là những cảm nhận chung nhất của em. Cuốn sách rất hay, rất đáng mua đọc ạ.
                    </Typography>
                    <Box display={'flex'} pt={1} gap={3}>
                        <Box display={'flex'} sx={{ cursor: 'pointer' }} alignItems={'center'} gap={1}>
                            <ThumbUpOutlinedIcon fontSize="small" />
                            <Typography lineHeight={1} fontSize={'small'}>Thích (0)</Typography>
                        </Box>
                        <Box display={'flex'} sx={{ cursor: 'pointer' }} alignItems={'center'} gap={1}>
                            <ReportGmailerrorredIcon fontSize="small" />
                            <Typography lineHeight={1} fontSize={'small'}>Báo cáo (0)</Typography>
                        </Box>
                    </Box>
                </Stack>
            </Box>
            <Divider />
            <Box display={'flex'} width={'100%'} alignItems={'flex-start'}>
                <Box display={'flex'} gap={1.5} alignItems={'center'} sx={{ width: '20%', flexShrink: 0 }}>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>S</Avatar>
                    <Stack gap={0.5}>
                        <Typography sx={{ fontWeight: 'medium', fontSize: 16, lineHeight: 1 }}>Hoàng Sơn</Typography>
                        <Typography sx={{ fontSize: 14, color: grey['A700'] }}>30/03/2025</Typography>
                    </Stack>
                </Box>
                <Stack spacing={1}>
                    <Rating value={5} size="small" readOnly />
                    <Typography fontSize={'small'}>
                        Cuốn sách Nhà Giả Kim của Paulo Coelho là một tác phẩm tinh tế về sự tìm kiếm ý nghĩa cuộc sống. Kết hợp giữa triết học Đông và Tây, câu chuyện về Santiago dẫn dắt độc giả qua một hành trình truyền cảm hứng, khám phá bản thân và khám phá thế giới xung quanh. Qua việc đọc sách, người đọc được khuyến khích suy ngẫm về ước mơ, định hướng cuộc sống và giá trị của sự kiên nhẫn và lòng kiên trì.
                    </Typography>
                    <Box display={'flex'} pt={1} gap={3}>
                        <Box display={'flex'} sx={{ cursor: 'pointer' }} alignItems={'center'} gap={1}>
                            <ThumbUpOutlinedIcon fontSize="small" />
                            <Typography lineHeight={1} fontSize={'small'}>Thích (0)</Typography>
                        </Box>
                        <Box display={'flex'} sx={{ cursor: 'pointer' }} alignItems={'center'} gap={1}>
                            <ReportGmailerrorredIcon fontSize="small" />
                            <Typography lineHeight={1} fontSize={'small'}>Báo cáo (0)</Typography>
                        </Box>
                    </Box>
                </Stack>
            </Box>
            <Divider />
            <Box display={'flex'} width={'100%'} alignItems={'flex-start'}>
                <Box display={'flex'} gap={1.5} alignItems={'center'} sx={{ width: '20%', flexShrink: 0 }}>
                    <Avatar sx={{ bgcolor: green[500] }}>H</Avatar>
                    <Stack gap={0.5}>
                        <Typography sx={{ fontWeight: 'medium', fontSize: 16, lineHeight: 1 }}>Hải Phạm</Typography>
                        <Typography sx={{ fontSize: 14, color: grey['A700'] }}>30/03/2025</Typography>
                    </Stack>
                </Box>
                <Stack spacing={1}>
                    <Rating value={4} size="small" readOnly />
                    <Typography fontSize={'small'}>
                        Sách rất hay. Hành trình của chàng trai chăn cừu làm mình suy ngẫm rất nhiều về ước mơ của bản thân. Khái niệm Giả kim thuật trong truyện cũng rất hay, không chỉ đơn giản là biến đổi kim loại thường thành kim loại quý mà còn là quá trình chắt lọc và tinh gọn tâm hồn
                    </Typography>
                    <Box display={'flex'} pt={1} gap={3}>
                        <Box display={'flex'} sx={{ cursor: 'pointer' }} alignItems={'center'} gap={1}>
                            <ThumbUpOutlinedIcon fontSize="small" />
                            <Typography lineHeight={1} fontSize={'small'}>Thích (0)</Typography>
                        </Box>
                        <Box display={'flex'} sx={{ cursor: 'pointer' }} alignItems={'center'} gap={1}>
                            <ReportGmailerrorredIcon fontSize="small" />
                            <Typography lineHeight={1} fontSize={'small'}>Báo cáo (0)</Typography>
                        </Box>
                    </Box>
                </Stack>
            </Box>
            <Box justifyContent={'center'} display={'flex'}>
                <Pagination count={10} shape="rounded" sx={{
                    '& .Mui-selected': {
                        backgroundColor: red['700'],
                        color: 'white',
                        fontWeight: 'medium'
                    },
                    '& .MuiPaginationItem-root:hover': {
                        backgroundColor: red['50'],
                    }
                }} />
            </Box>
        </Box>
    )
}