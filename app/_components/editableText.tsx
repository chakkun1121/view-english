export default function EditableText({
  text,
  canEdit,
  onChange,
  placeHolder,
  lang,
  className,
  ...props
}: {
  text: string;
  canEdit: boolean;
  onChange: (text: string) => void;
  placeHolder?: string;
  className?: string;
  lang?: string;
}) {
  return canEdit ? (
    <input
      placeholder={placeHolder}
      className={'w-full border' + className}
      defaultValue={text}
      onChange={(e) => onChange(e.target.value)}
      lang={lang}
      {...props}
    />
  ) : (
    <p {...props} lang={lang} className={className}>
      {text}
    </p>
  );
}
