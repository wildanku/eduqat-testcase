import Navbar from "./components/organisms/navbar";
import Container from "./components/organisms/container";
import Title from "./components/atoms/typography/title";
import Small from "./components/atoms/typography/small";
import Button from "./components/atoms/buttons/button";
import { Eye } from "@phosphor-icons/react";
import Section from "./components/organisms/section";
import Paragraph from "./components/atoms/typography/paragraph";
import Card from "./components/organisms/card";
import Sessions from "./components/molecules/sessions";
import { useEffect, useState } from "react";
import { EventType } from "./types/event";
import Heading2 from "./components/atoms/typography/heading2";
import moment from "moment";
import Modal from "./components/organisms/modal";
import { FormInput } from "./components/atoms/forms/form-input";
import { useForm } from "react-hook-form";
import { useEvent } from "./store/event";

type FormValues = {
  name: string;
  schedule: string;
};

function App() {
  const [modalAddEvent, setModalAddEvent] = useState<boolean>(false);

  const { event, setEvent } = useEvent();

  const { control, handleSubmit } = useForm<FormValues>();

  const getEvent = async () => {
    const storedEvent = localStorage.getItem("event");
    if (storedEvent) {
      setEvent(JSON.parse(storedEvent));
    }
  };

  const handleSaveEvent = handleSubmit((data) => {
    setModalAddEvent(false);
    let payload: EventType = {
      id: 1,
      title: data.name,
      schedule: data.schedule,
      updated_at: moment().format("YYYY-MM-DD HH:ss"),
      sessions: [],
    };

    localStorage.setItem("event", JSON.stringify(payload));
    setEvent(payload);
  });

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <main>
      <div className="min-h-screen">
        <Navbar />

        <Container>
          {event ? (
            <>
              <Section className="py-3 flex items-center justify-between">
                <div className="flex items-end gap-4">
                  <Title>{event.title}</Title>
                  <Small>
                    <>
                      Last edited{" "}
                      {event.updated_at
                        ? moment(event.updated_at).format("DD MMM YYYY | HH:ss")
                        : "-"}
                    </>
                  </Small>
                </div>
                <Button type="primary" outlined={true}>
                  <div className="flex items-center gap-3">
                    <Eye size={18} /> Preview
                  </div>
                </Button>
              </Section>

              <Section>
                <div className="flex w-full border-b">
                  <div className="py-3 pr-3 border-b-2 border-purple-600 text-purple-600 cursor-pointer">
                    <Paragraph className="font-semibold">Curriculum</Paragraph>
                  </div>
                </div>
              </Section>

              <Section className="mt-8">
                <Card>
                  <Paragraph>Event Schedule: 24 Oktober 2021, 16.30</Paragraph>
                </Card>
              </Section>

              <Section className="grid grid-cols-1 gap-3">
                <Sessions sessions={event.sessions} />
              </Section>
            </>
          ) : (
            <div className="w-full flex justify-center items-center h-screen fixed top-0 left-0">
              <div>
                <img src="/images/notfound.webp" alt="" />
                <div className="text-center">
                  <Heading2>Oops, tidak ada event ditemukan!</Heading2>
                  <div className="mt-3">
                    <Button onClick={() => setModalAddEvent(true)}>
                      Tambah
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
      <Modal
        title="Add Event"
        isOpen={modalAddEvent}
        onClose={() => setModalAddEvent(false)}
      >
        <FormInput control={control} label="Nama Event" name="name" />
        <FormInput
          control={control}
          label="Tanggal"
          name="schedule"
          type="datetime-local"
        />
        <div className="flex justify-end">
          <Button type="primary" outlined={false} onClick={handleSaveEvent}>
            Simpan
          </Button>
        </div>
      </Modal>
    </main>
  );
}

export default App;
