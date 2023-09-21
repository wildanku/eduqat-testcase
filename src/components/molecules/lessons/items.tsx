import { Clock } from "@phosphor-icons/react";
import Dot from "../../atoms/icons/dot";
import Dots from "../../atoms/icons/dots";
import Video from "../../atoms/icons/video";
import Paragraph from "../../atoms/typography/paragraph";
import Small from "../../atoms/typography/small";
import Download from "../../atoms/icons/download";
import ButtonSquare from "../../atoms/buttons/square";
import Dots3 from "../../atoms/icons/dots3";
import LessonInfo from "./info";
import { LessonType } from "../../../types/event";
import moment from "moment";

type Props = {
  lesson: LessonType;
};

const LessonItem = ({ lesson }: Props) => {
  return (
    <div className="w-full flex justify-between select-none p-2 rounded-lg items-center cursor-pointer hover:bg-gray-100">
      <div className="flex items-center gap-3">
        <Dots />
        <Video />
        <Paragraph className="pl-2">{lesson.title}</Paragraph>
        {lesson.required && (
          <Paragraph className="text-purple-600 pl-2 border-l">
            Required
          </Paragraph>
        )}
        <Dot />
        {lesson.previewable && (
          <Small className="text-gray-400">Previewable</Small>
        )}
      </div>
      <div className="flex items-center gap-3">
        <LessonInfo>
          <Clock size={24} />
          <Paragraph>
            {lesson.date
              ? moment(lesson.date).format("DD MMM YYYY, HH:ss")
              : "-"}
          </Paragraph>
        </LessonInfo>
        <Dot />
        <LessonInfo>
          <Clock size={24} />
          <Paragraph>{`${lesson.duration} Min`}</Paragraph>
        </LessonInfo>
        <Dot />
        {lesson.downloadble && (
          <LessonInfo>
            <Download />
            <Paragraph>Downloadable</Paragraph>
          </LessonInfo>
        )}
        <ButtonSquare className="bg-gray-200">
          <Dots3 />
        </ButtonSquare>
      </div>
    </div>
  );
};

export default LessonItem;
