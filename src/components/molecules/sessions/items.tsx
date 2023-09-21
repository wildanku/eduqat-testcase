import { Plus } from "@phosphor-icons/react";
import ButtonSquare from "../../atoms/buttons/square";
import Dots from "../../atoms/icons/dots";
import Dots2 from "../../atoms/icons/dots2";
import Pencil from "../../atoms/icons/pencil";
import Heading2 from "../../atoms/typography/heading2";
import Card from "../../organisms/card";
import Section from "../../organisms/section";
import Paragraph from "../../atoms/typography/paragraph";
import LessonItem from "../lessons/items";
import { LessonType, SessionType } from "../../../types/event";
import { useEffect, useState } from "react";
import Modal from "../../organisms/modal";
import { FormInput } from "../../atoms/forms/form-input";
import Button from "../../atoms/buttons/button";
import { useEvent } from "../../../store/event";
import { FormSelect } from "../../atoms/forms/form-select";
import { useForm } from "react-hook-form";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

type Props = {
  session: SessionType;
};

type FormValues = {
  title: string;
  type: "online" | "offline" | undefined;
  previewable: string;
  required: string;
  date: string;
  duration: string;
  downloadble: string;
};

const SessionItem = ({ session }: Props) => {
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [sessionSelected, setSession] = useState<SessionType | undefined>(
    undefined
  );
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [modalAddLesson, setModalLesson] = useState<boolean>(false);
  const [list, setList] = useState<LessonType[] | []>([]);

  const { event, setEvent } = useEvent();
  const { control, handleSubmit, setValue } = useForm<FormValues>();

  const handleEditSession = (session: SessionType) => {
    setSession(session);
    setModalEdit(true);
  };

  const handleUpdateSession = () => {
    setModalEdit(false);

    if (event) {
      let newEvent = { ...event };

      newEvent.sessions = newEvent.sessions.map((session: any) => {
        if (session.id === sessionSelected?.id) {
          return {
            ...session,
            title: title,
          };
        }
        return session;
      });

      localStorage.setItem("event", JSON.stringify(newEvent));
      setEvent(newEvent);
    }
  };

  const handleCreateLesson = handleSubmit((data) => {
    setModalLesson(false);

    if (event) {
      let newEvent = { ...event };
      let newLesson = {
        id: Math.floor(Math.random() * 999999),
        type: data.type,
        order: 0,
        title: data.title,
        required: data.required === "yes" ? true : false,
        previewable: data.previewable,
        date: data.date,
        duration: data.duration,
        downloadble: data.downloadble,
      };

      newEvent.sessions = newEvent.sessions.map((item: any) => {
        if (item.id === session?.id) {
          return {
            ...item,
            lessons: [...item.lessons, newLesson],
          };
        }
        return session;
      });

      localStorage.setItem("event", JSON.stringify(newEvent));
      setEvent(newEvent);
      clearForm();
    }
  });

  const clearForm = () => {
    setValue("title", "");
    setValue("date", "");
    setValue("downloadble", "");
    setValue("duration", "");
    setValue("previewable", "");
    setValue("required", "");
    setValue("type", undefined);
  };

  const reorder = (
    list: LessonType[],
    startIndex: number,
    endIndex: number
  ): LessonType[] => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }
    console.log(result);
    // const updatedItems = reorder(
    //   items,
    //   result.source.index,
    //   result.destination.index
    // );

    // setList(updatedItems);
  };

  useEffect(() => {
    setList(session.lessons);
  }, [event]);

  return (
    <>
      <Card>
        <div className="py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dots />
            <Heading2>{session.title}</Heading2>
            <div
              className="cursor-pointer"
              onClick={() => handleEditSession(session)}
            >
              <Pencil />
            </div>
          </div>
          <ButtonSquare className="bg-gray-200">
            <Dots2 />
          </ButtonSquare>
        </div>
        <Section>
          {session.lessons.length === 0 ? (
            <>There is no lesson</>
          ) : (
            <>
              {/* {session.lessons.map((item, key) => (
                <LessonItem key={key} lesson={item} />
              ))} */}
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={`lesson-list-${session.id}`}>
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {session.lessons.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <LessonItem lesson={item} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </>
          )}
        </Section>
        <Section className="flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer hover:text-gray-700"
            onClick={() => setModalLesson(true)}
          >
            <ButtonSquare className="bg-purple-600 text-white">
              <Plus weight="bold" />
            </ButtonSquare>
            <Paragraph>Add Lesson Material</Paragraph>
          </div>
        </Section>
      </Card>

      <Modal
        title="Edit Session"
        isOpen={modalEdit}
        onClose={() => setModalEdit(false)}
      >
        <FormInput
          label="Title"
          name="title"
          defaultValue={sessionSelected?.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="mt-3 flex justify-end">
          <Button type="primary" outlined={false} onClick={handleUpdateSession}>
            Save
          </Button>
        </div>
      </Modal>

      <Modal
        title="Add Lesson"
        isOpen={modalAddLesson}
        onClose={() => setModalLesson(false)}
      >
        <FormInput
          label="Title"
          name="title"
          control={control}
          defaultValue={sessionSelected?.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormSelect
          label="Type"
          name="type"
          control={control}
          options={[
            { value: "online", label: "Online" },
            { value: "offline", label: "Offline" },
          ]}
        />
        <FormSelect
          label="Previewable?"
          name="previewable"
          control={control}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        <FormSelect
          label="Required?"
          name="required"
          control={control}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        <FormInput
          label="Date"
          name="date"
          type="datetime-local"
          control={control}
          defaultValue={sessionSelected?.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormInput
          label="Duration"
          name="duration"
          type="time"
          control={control}
          defaultValue={sessionSelected?.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormSelect
          label="Downloadable?"
          name="downloadble"
          control={control}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        <div className="mt-3 flex justify-end">
          <Button type="primary" outlined={false} onClick={handleCreateLesson}>
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SessionItem;
