import React, { useState } from 'react';
import {
    Button, TextField, Container, Typography, Grid, Paper, IconButton, Box
} from '@material-ui/core';

function DateTimeGenerator() {
    const [startDate, setStartDate] = useState('');
    const [numDays, setNumDays] = useState(1);
    const [times, setTimes] = useState(['19:00']);
    const [output, setOutput] = useState('');

    const generateOutput = () => {
        if (!startDate) {
            alert('開始日を入力してください。');
            return;
        }

        const days = ['日', '月', '火', '水', '木', '金', '土'];
        let currentDate = new Date(startDate);
        let result = '';

        for (let i = 0; i < numDays; i++) {
            const month = currentDate.getMonth() + 1;
            const date = currentDate.getDate();
            const day = days[currentDate.getDay()];

            times.sort().forEach(time => {
                if (time) {
                    result += `${month}/${date}(${day}) ${time}～\n`;
                }
            });

            currentDate.setDate(currentDate.getDate() + 1);
        }

        setOutput(result.trim());
    };

    const addTime = () => {
        setTimes([...times, '']);
    };

    const updateTime = (index, value) => {
        const newTimes = [...times];
        newTimes[index] = value;
        setTimes(newTimes);
    };

    const removeTime = (index) => {
        if (times.length > 1) {
            const newTimes = times.filter((_, i) => i !== index);
            setTimes(newTimes);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output).then(() => {
            alert('結果をクリップボードにコピーしました。');
        }, (err) => {
            console.error('コピーに失敗しました: ', err);
        });
    };

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    調整さん日付時間生成ツール
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="開始日"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="「開始日」から追加する日数"
                            type="number"
                            value={numDays}
                            onChange={(e) => setNumDays(parseInt(e.target.value))}
                            inputProps={{ min: "1" }}
                        />
                    </Grid>
                    {times.map((time, index) => (
                        <Grid item xs={12} key={index}>
                            <Box display="flex" alignItems="center">
                                <TextField
                                    fullWidth
                                    label={`時間 ${index + 1}`}
                                    type="time"
                                    value={time}
                                    onChange={(e) => updateTime(index, e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <IconButton
                                    onClick={() => removeTime(index)}
                                    disabled={times.length === 1}
                                    color="secondary"
                                >
                                    -
                                </IconButton>
                            </Box>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Typography gutterBottom>
                            「生成」するときに時間は昇順で並び替えされます。
                        </Typography>
                        <Button variant="outlined" color="primary" onClick={addTime}>
                            時間を追加
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={generateOutput}>
                            生成
                        </Button>
                    </Grid>
                </Grid>
                {output && (
                    <Box mt={3}>
                        <Paper elevation={3}>
                            <Box p={2}>
                                <Typography component="pre" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                    {output}
                                </Typography>
                            </Box>
                        </Paper>
                        <Box mt={2}>
                            <Button variant="contained" color="secondary" onClick={copyToClipboard}>
                                結果をコピー
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Container>
    );
}

export default DateTimeGenerator;
