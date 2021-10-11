import Header from "../../components/Header";
import Button from "../../components/Button";
import InputText from "../../components/InputText";
import { Container, Box } from "./styles";
import { InputTypes } from "../../model/enums/input-types";
import { Checkbox, Select, Upload, Button as AntButton } from "antd";
import SchemaUtils from "../../shared/util/schema-utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import animes from "../../mock/animes.json";
import { UploadOutlined } from "@ant-design/icons";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

interface FormAnime {
  animeName: string;
  sinopse: string;
  episodesNumber: number;
  isDubbed: boolean;
  isMovie: boolean;
  categories: string[];
  image: File;
}

interface FormEpisode {
  anime: string;
  episodeNumber: number;
  videoUrl: string;
  image: File;
}

interface FormModerator {
  email: string;
}

const Admin = () => {
  const [categories, setCategories] = useState<any>([]);
  const [isDubbed, setIsDubbed] = useState(false);
  const [isMovie, setIsMovie] = useState(false);
  const [anime, setAnime] = useState<any>("");

  const inputAnime = [
    {
      name: "animeName",
      placeholder: "Nome do anime",
      label: "Nome do anime*",
      type: InputTypes.TEXT,
    },
    {
      name: "sinopse",
      placeholder: "Uma sinopse bem legal...",
      label: "Sinopse*",
      type: InputTypes.TEXT,
    },
    {
      name: "episodesNumber",
      placeholder: "Número de episódios",
      label: "Total de episódios*",
      type: InputTypes.NUMBER,
    },
  ];

  const inputModerator = [
    {
      name: "email",
      placeholder: "exemplo@mail.com",
      label: "Email*",
      type: InputTypes.EMAIL,
    },
  ];
  const inputEpisode = [
    {
      name: "episodeNumber",
      placeholder: "número",
      label: "Número*",
      type: InputTypes.NUMBER,
    },
    {
      name: "videoUrl",
      placeholder: "https://example.com",
      label: "Vídeo url*",
      type: InputTypes.TEXT,
    },
  ];

  const methodsAnime = useForm({
    resolver: yupResolver(SchemaUtils.anime()),
    mode: "all",
  });

  const methodsModerator = useForm({
    resolver: yupResolver(SchemaUtils.moderator()),
    mode: "all",
  });

  const methodsEpisode = useForm({
    resolver: yupResolver(SchemaUtils.episode()),
    mode: "all",
  });

  const onSubmitAnime = (data: FormAnime) => {
    console.log(data);
    const output = {
      animeName: data.animeName,
      sinopse: data.sinopse,
      episodesNumber: data.episodesNumber,
      isDubbed: isDubbed,
      isMovie: isMovie,
      categories: categories,
      image: data.image,
    };
    console.log(output);
  };

  const onSubmitEpisode = (data: FormEpisode) => {
    console.log(data);
    // const output = {
    //   anime: anime,
    //   episodeNumber: data.episodeNumber,
    //   videoUrl: data.videoUrl,
    //   image: data.image,
    // };
    // console.log(output);
  };

  const { Option } = Select;
  // const {
  //   register,
  //   getValues,
  //   formState: { errors, dirtyFields },
  //   setValue,
  // } = useFormContext();

  const teste = ["Shoujo", "Shounen", "Aventura", "Ação"].sort();

  return (
    <>
      <Header />
      <Container>
        <h2>Adicionar anime:</h2>
        <Box>
          <FormProvider {...methodsAnime}>
            <form onSubmit={methodsAnime.handleSubmit(onSubmitAnime)}>
              {inputAnime.map((input, index) => (
                <InputText
                  key={`${input.name}-anime-${index}`}
                  name={input.name}
                  placeholder={input.placeholder}
                  label={input.label}
                  type={input?.type ?? ""}
                  autofocus={index === 0}
                />
              ))}
              <Checkbox
                name="isDubbed"
                onChange={(e) => setIsDubbed(e.target.checked)}
              >
                Dublado
              </Checkbox>
              <Checkbox
                name="isMovie"
                onChange={(e) => setIsMovie(e.target.checked)}
              >
                Filme
              </Checkbox>
              <Select mode="multiple" onChange={(e) => setCategories(e)}>
                {teste.map((category, index) => (
                  <Option
                    name={category}
                    value={category}
                    key={`${category}-category-${index}`}
                  >
                    {category}
                  </Option>
                ))}
              </Select>
              <Upload>
                <AntButton icon={<UploadOutlined />}>
                  Escolha uma imagem
                </AntButton>
              </Upload>

              <Button text="Enviar" />
            </form>
          </FormProvider>
        </Box>
        <h2>Adicionar episódio:</h2>
        <Box>
          <FormProvider {...methodsEpisode}>
            <form onSubmit={methodsEpisode.handleSubmit(onSubmitEpisode)}>
              <Select onChange={(e) => console.log(e)}>
                {animes.map((anime, index) => (
                  <Option
                    name={anime.name}
                    value={anime.name}
                    key={`${anime.name}-anime-${index}`}
                  >
                    {anime.name}
                  </Option>
                ))}
              </Select>
              {inputEpisode.map((input, index) => (
                <InputText
                  key={`${input.name}-episode-${index}`}
                  name={input.name}
                  placeholder={input.placeholder}
                  label={input.label}
                  type={input.type ?? ""}
                  autofocus={index === 0}
                />
              ))}
              <Upload>
                <AntButton icon={<UploadOutlined />}>
                  Escolha uma imagem
                </AntButton>
              </Upload>
              <Button text="Enviar" />
            </form>
          </FormProvider>
        </Box>
        <h2>Adicionar moderador:</h2>
        <Box>
          <FormProvider {...methodsModerator}>
            <form onSubmit={methodsModerator.handleSubmit(onSubmitAnime)}>
              {inputModerator.map((input, index) => (
                <InputText
                  key={`${input.name}-moderator-${index}`}
                  name={input.name}
                  placeholder={input.placeholder}
                  label={input.label}
                  type={input?.type ?? ""}
                  autofocus={index === 0}
                />
              ))}
              <Button text="Enviar" />
            </form>
          </FormProvider>
        </Box>
        <Button text="Ver moderadores" />
      </Container>
    </>
  );
};

export default Admin;
