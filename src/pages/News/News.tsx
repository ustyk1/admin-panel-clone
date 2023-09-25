import "./News.css";
import {useForm} from "react-hook-form";
import {Schema} from "./typeNews.ts";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, {useEffect} from "react";
import {createNews, getAllNews} from "../../services/api-user-service/api-user-service.ts";
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

export default function News() {
  const [news, setNews] = React.useState([]);

  useEffect(() => {
    getAllNews().then((res: any) => {
      setNews(res.response.news)
    })
  }, [])

  const form = useForm<Schema>();
  const { register, handleSubmit, reset, formState } = form;
  const { errors } = formState;

  // for snackbar
  const [open, setOpen] = React.useState(false);

  const handleSuccess = () => {
    setOpen(true);
  };

  const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSubmit = (data: Schema) => {
    const newsData = {
      title: data.title,
      author: data.author,
      description: data.description,
    };

    console.log('onSubmit updatedData', newsData)
    createNews(newsData);
    handleSuccess();
    reset();
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Edited successfully!
        </Alert>
      </Snackbar>

      <div className="block__add-news">
        <form className="form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <TextField
              id='name-basic'
              label='Title'
              variant='standard'
              {...form.register("title", {
                required: "Title is required",
              })}
          />
          <p className="errorM">{errors.title?.message}</p>
          <TextField
              id='name-basic'
              label='Author'
              variant='standard'
              {...form.register("author", {
                required: "Author is required",
              })}
          />
          <p className="errorM">{errors.author?.message}</p>
          <textarea placeholder="Enter the article"
                    {...form.register("description", {
                      required: "Description is required",
                    })}
          ></textarea>
          <p className="errorM">{errors.description?.message}</p>
          <Button
              className="btnSumbit"
              type="submit"
              variant="outlined"
              size="large"
          >Create</Button>
        </form>
      </div>
      <hr />
      <div className='newsWrapper'>
        {news?.reverse().map((article: any) => (
            <Card
                key={article.title}
                variant="solid"
                color="primary"
                invertedColors
                sx={{
                  height: 'auto',
                  boxShadow: 'lg',
                  minWidth: 400,
                  maxWidth: '100%',
                  resize: 'horizontal',
                  marginBottom: '15px'
                }}
            >
              <div>
                <Typography level="h3">
                  {article.title}
                </Typography>
              </div>
              <CardContent>
                <Typography>
                  {article.author}
                </Typography>
                <Typography>
                  {article.description}
                </Typography>
              </CardContent>
            </Card>
        ))}
      </div>
    </>
  );
}
