import { Plus } from "@phosphor-icons/react";
import { EventType, SessionType } from "../../../types/event";
import Button from "../../atoms/buttons/button";
import Heading from "../../atoms/typography/heading";
import SessionItem from "./items";
import { useEffect, useState } from "react";
import Modal from "../../organisms/modal";
import { FormInput } from "../../atoms/forms/form-input";
import { useForm } from "react-hook-form";
import { useEvent } from "../../../store/event";

type Props = {
  sessions: SessionType[] | [];
};

type FormValues = {
  title: string;
};

const Sessions = ({ sessions }: Props) => {
  const [modalAdd, setModalAdd] = useState<boolean>(false);

  const { control, handleSubmit, setValue } = useForm<FormValues>();
  const { setEvent, event } = useEvent();

  const handleAddSession = handleSubmit((data) => {
    setModalAdd(false);
    setValue("title", "");
    const newSession = {
      id: Math.floor(Math.random() * 999999),
      title: data.title,
      order: 0,
      lessons: [],
    };

    if (event) {
      let newEvent = { ...event };
      newEvent.sessions = [...event.sessions, newSession];
      localStorage.setItem("event", JSON.stringify(newEvent));
      setEvent(newEvent);
    }
  });

  useEffect(() => {}, [event]);

  return (
    <>
      {sessions.length === 0 ? (
        <div className="w-full bg-purple-50 rounded-lg p-5 text-purple-700 flex items-center justify-center text-center">
          <div>
            <Heading>No Session</Heading>
            <Button
              type="primary"
              className="flex items-center gap-2"
              outlined={false}
              onClick={() => setModalAdd(true)}
            >
              <Plus />
              <p>Add new session</p>
            </Button>
          </div>
        </div>
      ) : (
        <>
          {sessions.map((item, key) => (
            <SessionItem key={key} session={item} />
          ))}
        </>
      )}

      <div className="flex justify-end items-center">
        <Button
          type="primary"
          className="flex items-center gap-2"
          outlined={false}
          onClick={() => setModalAdd(true)}
        >
          <Plus />
          <span>Add session</span>
        </Button>
      </div>

      <Modal
        title="Add Session"
        isOpen={modalAdd}
        onClose={() => setModalAdd(false)}
      >
        <FormInput label="Title" name="title" control={control} />
        <div className="mt-3 flex justify-end">
          <Button type="primary" outlined={false} onClick={handleAddSession}>
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default Sessions;
